import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import axios from 'axios';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || process.env.API_PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, 'dist')));

// Explicitly bind to 0.0.0.0 for containerized environments (Fly.io)
const HOST = '0.0.0.0';

// In-memory store for verification codes (use Redis/DB in production)
const verificationCodes = new Map();

// Code expiry time (15 minutes)
const CODE_EXPIRY_MS = 15 * 60 * 1000;

// Reviews Caching Configuration
const REVIEWS_CACHE_PATH = path.join(__dirname, 'reviews-cache.json');
const CACHE_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

// Configuration File Paths
const BUSINESS_INFO_PATH = path.join(__dirname, 'BUSINESS_INFO.json');
const SERVICES_PATH = path.join(__dirname, 'SERVICES.json');

let reviewsCache = {
    data: [],
    lastFetched: 0
};

// Load cache from disk on startup
try {
    if (fs.existsSync(REVIEWS_CACHE_PATH)) {
        const cachedContent = fs.readFileSync(REVIEWS_CACHE_PATH, 'utf8');
        const parsed = JSON.parse(cachedContent);
        if (parsed.data && Array.isArray(parsed.data)) {
            reviewsCache = parsed;
            console.log(`[${new Date().toISOString()}] Loaded ${reviewsCache.data.length} reviews from disk cache. Last updated: ${new Date(reviewsCache.lastFetched).toLocaleString()}`);
        }
    }
} catch (error) {
    console.error('Failed to load reviews cache from disk:', error.message);
}

// Create SMTP transporter
const createTransporter = () => {
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });
};

// Load and prepare email template
const getEmailTemplate = (code) => {
    const templatePath = path.join(__dirname, 'email-templates', 'verification.html');
    let template = fs.readFileSync(templatePath, 'utf-8');

    // Replace placeholders
    template = template.replace(/\{\{CODE\}\}/g, code);
    template = template.replace(/\{\{YEAR\}\}/g, new Date().getFullYear().toString());

    return template;
};

const getContactMessageTemplate = (data) => {
    const { name, email, phone, message } = data;
    const templatePath = path.join(__dirname, 'email-templates', 'contact-message.html');
    let template = fs.readFileSync(templatePath, 'utf-8');

    // Handle optional phone row
    const phoneRow = phone ? `
                                <tr>
                                    <td style="padding: 12px 0; border-bottom: 1px solid #f2ebe5;">
                                        <p style="margin: 0; color: #8b5a2b; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Phone Number</p>
                                        <p style="margin: 4px 0 0 0; color: #1a1614; font-size: 16px; font-weight: 500;">${phone}</p>
                                    </td>
                                </tr>` : '';

    // Replace placeholders
    template = template.replace(/\{\{NAME\}\}/g, name);
    template = template.replace(/\{\{EMAIL\}\}/g, email);
    template = template.replace(/\{\{PHONE_ROW\}\}/g, phoneRow);
    template = template.replace(/\{\{MESSAGE\}\}/g, message);
    template = template.replace(/\{\{YEAR\}\}/g, new Date().getFullYear().toString());

    return template;
};

// Generate 6-digit code
const generateCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// API: Send verification email
app.post('/api/send-verification', async (req, res) => {
    const { email, name } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        const code = generateCode();
        const expiresAt = Date.now() + CODE_EXPIRY_MS;

        // Store the code
        verificationCodes.set(email.toLowerCase(), {
            code,
            expiresAt,
            name,
        });

        // Clean up expired codes periodically
        setTimeout(() => {
            const stored = verificationCodes.get(email.toLowerCase());
            if (stored && stored.expiresAt <= Date.now()) {
                verificationCodes.delete(email.toLowerCase());
            }
        }, CODE_EXPIRY_MS + 1000);

        // Send email
        const transporter = createTransporter();
        const htmlContent = getEmailTemplate(code);

        const mailOptions = {
            from: `"${process.env.SMTP_FROM_NAME || 'The Pampered Pooch'}" <${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER}>`,
            to: email,
            subject: 'Your Verification Code - The Pampered Pooch',
            html: htmlContent,
            text: `Your verification code is: ${code}\n\nThis code expires in 15 minutes.\n\nIf you didn't request this code, please ignore this email.\n\nThe Pampered Pooch\nLot 102 Main Road, Willunga, SA 5172\nPhone: (08) 8556 4155`,
        };

        await transporter.sendMail(mailOptions);

        console.log(`[${new Date().toISOString()}] Verification code sent to ${email}`);

        res.json({ success: true, message: 'Verification code sent' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send verification email. Please try again.' });
    }
});

// API: Verify code
app.post('/api/verify-code', (req, res) => {
    const { email, code } = req.body;

    if (!email || !code) {
        return res.status(400).json({ error: 'Email and code are required' });
    }

    const stored = verificationCodes.get(email.toLowerCase());

    if (!stored) {
        return res.status(400).json({ error: 'No verification code found. Please request a new one.' });
    }

    if (Date.now() > stored.expiresAt) {
        verificationCodes.delete(email.toLowerCase());
        return res.status(400).json({ error: 'Code expired. Please request a new one.' });
    }

    if (stored.code !== code) {
        return res.status(400).json({ error: 'Incorrect code. Please try again.' });
    }

    // Code is valid - clean up
    verificationCodes.delete(email.toLowerCase());

    console.log(`[${new Date().toISOString()}] Email verified: ${email}`);

    res.json({ success: true, message: 'Email verified successfully' });
});

// API: Send contact message (after verification)
app.post('/api/send-message', async (req, res) => {
    const { name, email, phone, message } = req.body;
    const recipient = process.env.MESSAGE_RECIPIENT;

    if (!recipient) {
        console.error('MESSAGE_RECIPIENT not configured in .env');
        return res.status(500).json({ error: 'Server configuration error' });
    }

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    try {
        const transporter = createTransporter();
        const htmlContent = getContactMessageTemplate({ name, email, phone, message });

        const mailOptions = {
            from: `"${process.env.SMTP_FROM_NAME || 'The Pampered Pooch Website'}" <${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER}>`,
            replyTo: email,
            to: recipient,
            subject: `New Contact Form Message from ${name}`,
            html: htmlContent,
            text: `New Contact Form Message\n\nFrom: ${name}\nEmail: ${email}\n${phone ? `Phone: ${phone}\n` : ''}\nMessage:\n${message}`,
        };

        await transporter.sendMail(mailOptions);

        console.log(`[${new Date().toISOString()}] Contact message sent from ${email} to ${recipient}`);

        res.json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
        console.error('Error sending contact message:', error);
        res.status(500).json({ error: 'Failed to send message. Please try again.' });
    }
});

// API: Get Google Reviews via Outscraper
app.get('/api/reviews', async (req, res) => {
    try {
        const now = Date.now();
        const cacheAge = now - reviewsCache.lastFetched;

        // Use cache if it's fresh enough (less than 24 hours) and has data
        if (reviewsCache.data.length > 0 && cacheAge < CACHE_DURATION_MS) {
            console.log(`[${new Date().toISOString()}] Serving ${reviewsCache.data.length} reviews from 24h cache.`);
            return res.json(reviewsCache.data);
        }

        console.log(`[${new Date().toISOString()}] Cache expired or missing. Fetching fresh reviews from Outscraper...`);

        const API_KEY = process.env.OUTSCRAPER_API_KEY;
        const PLACE_ID = process.env.GOOGLE_PLACE_ID || 'ChIJs2DI-0wlsWoRcIhv9lHWxXg';

        if (!API_KEY) {
            throw new Error('OUTSCRAPER_API_KEY not configured');
        }

        const response = await axios.get('https://api.outscraper.cloud/google-maps-reviews', {
            params: {
                query: PLACE_ID,
                reviewsLimit: 500,
                limit: 1,
                sort: 'newest',
                language: 'en',
                async: false
            },
            headers: {
                'X-API-KEY': API_KEY
            }
        });

        if (!response.data || !response.data.data || !response.data.data[0]) {
            throw new Error('Empty or invalid response from API.');
        }

        const placeResult = response.data.data[0];
        const reviews = placeResult.reviews_data || placeResult.reviews || [];

        // Filter for 5-star reviews only and process
        const processedReviews = reviews
            .filter(review => {
                const rating = Number(review.rating || review.review_rating);
                // Cull reviews that do not have any text
                const hasText = review.review_text && review.review_text.trim().length > 0;
                return rating === 5 && hasText;
            })
            .map(review => ({
                id: review.review_id || review.review_timestamp,
                name: review.author_title,
                petName: "Happy Client",
                review: review.review_text,
                rating: Number(review.rating || review.review_rating),
                image: review.author_image,
                // Support both review_img_urls (array of strings) and review_images (array of objects)
                reviewImages: review.review_img_urls || (review.review_images ? review.review_images.map(img => img.image) : [])
            }));

        // Update local cache and save to disk
        reviewsCache.data = processedReviews;
        reviewsCache.lastFetched = now;

        try {
            fs.writeFileSync(REVIEWS_CACHE_PATH, JSON.stringify(reviewsCache, null, 2));
            console.log(`[${new Date().toISOString()}] Successfully saved ${processedReviews.length} reviews to disk cache.`);
        } catch (e) {
            console.error('Failed to save reviews cache to disk:', e.message);
        }

        res.json(processedReviews);
    } catch (error) {
        console.error('Outscraper Error:', error.message);
        // Fallback to cache even if expired if API fails
        if (reviewsCache.data.length > 0) {
            console.log('Serving stale cache due to API error');
            return res.json(reviewsCache.data);
        }
        res.status(500).json({ error: 'Failed to fetch reviews' });
    }
});

// API: Get Business Info and Services configuration
app.get('/api/config', (req, res) => {
    try {
        let businessInfo = {};
        let services = [];

        if (fs.existsSync(BUSINESS_INFO_PATH)) {
            businessInfo = JSON.parse(fs.readFileSync(BUSINESS_INFO_PATH, 'utf8'));
        }
        if (fs.existsSync(SERVICES_PATH)) {
            services = JSON.parse(fs.readFileSync(SERVICES_PATH, 'utf8'));
        }

        res.json({ businessInfo, services });
    } catch (error) {
        console.error('Failed to load configuration files:', error.message);
        res.status(500).json({ error: 'Failed to load configuration' });
    }
});


// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// All other GET requests not handled before will return the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start server
app.listen(PORT, HOST, () => {
    console.log(`\n🐾 The Pampered Pooch API Server`);
    console.log(`   Running on http://${HOST}:${PORT}`);
    console.log(`   SMTP Host: ${process.env.SMTP_HOST || '(not configured)'}`);
    console.log(`   Google Places: ${process.env.GOOGLE_PLACE_ID ? 'Configured' : 'Not Configured'}\n`);
});
