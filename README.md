<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# The Pampered Pooch Website

Professional grooming website with integrated Google Reviews.

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Fill in the required values (see below)

3. Run the app:
   ```bash
   npm run dev:all
   ```
   This starts both the frontend (Vite) and backend (Express API).

---

## Google Reviews Setup

To display live Google Reviews in the Testimonials section, you need:

### 1. Get a Google Places API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project (or select an existing one).
3. Navigate to **APIs & Services > Library**.
4. Search for "**Places API**" and enable it.
5. Go to **APIs & Services > Credentials**.
6. Click **Create Credentials > API Key**.
7. (Recommended) Restrict the key:
   - Under "Application restrictions", select **HTTP referrers** and add your domain(s).
   - Under "API restrictions", select **Restrict key** and choose **Places API**.
8. Copy the API key.

### 2. Find Your Google Place ID

1. Go to [Google's Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id#find-id).
2. Search for your business name and address (e.g., "The Pampered Pooch, Willunga").
3. The Place ID will appear on the map info window (a string starting with `ChIJ...`).
4. Copy the Place ID.

### 3. Configure .env

Add both values to your `.env` file:

```env
GOOGLE_PLACES_API_KEY=AIzaSy...your_key_here
GOOGLE_PLACE_ID=ChIJ...your_place_id_here
```

### 4. Restart the Server

```bash
npm run dev:all
```

The Testimonials section will now display your 5-star Google Reviews!

---

## Environment Variables

| Variable | Description |
| :--- | :--- |
| `SMTP_HOST` | SMTP server for email verification |
| `SMTP_PORT` | SMTP port (usually 587) |
| `SMTP_USER` | SMTP username |
| `SMTP_PASS` | SMTP password |
| `MESSAGE_RECIPIENT` | Email address to receive contact form messages |
| `GOOGLE_PLACES_API_KEY` | Google Cloud API Key with Places API enabled |
| `GOOGLE_PLACE_ID` | Your business's Google Place ID |

