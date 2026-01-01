import { BusinessInfo, NavItem, Service, Testimonial } from "./types";

export const BUSINESS_INFO: BusinessInfo = {
  address: "Lot 102 Main Road, Willunga, SA 5172",
  postalAddress: "P.O. Box 109, Willunga, SA 5172",
  phone: "0885564155",
  phoneDisplay: "(08) 8556 4155",
  fax: "(08) 8556 2299",
  hours: [
    "Mon - Fri: 8:30 AM - 5:00 PM",
    "Saturday: 9:00 AM - 2:00 PM",
    "Sunday: Closed"
  ]
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#hero" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export const SERVICES: Service[] = [
  {
    id: 1,
    title: "Expert Styling",
    description: "Standard and show-quality cuts tailored to breed standards. We provide professional styling for both canine and feline clients.",
    fullDescription: "Our expert styling service is tailored to your pet's specific breed standards and your personal preferences. Whether you want a practical summer clip or a show-stopping style, our groomers have the expertise to deliver a precision cut that enhances your pet's natural beauty.",
    features: [
      "Breed-specific standard cuts",
      "Personalized styling consultation",
      "Matting removal and coat restoration",
      "Sanitary trimming",
      "Premium cologne finish"
    ],
    pricingDetails: "Small breeds from $85 | Medium from $95 | Large from $110. Additional charges may apply for heavily matted coats or difficult behavior.",
    price: "From $85",
    iconType: "scissors"
  },
  {
    id: 2,
    title: "Therapeutic Treatments",
    description: "Specialized care for pets with skin conditions or flea infestations using premium medicinal shampoos to restore health and comfort.",
    fullDescription: "Skin conditions can be uncomfortable and painful for pets. We offer a comprehensive range of medicated washes and treatments designed to soothe irritated skin, treat active flea infestations, and improve overall coat health.",
    features: [
      "Medicated soothing shampoos",
      "Flea and tick rinses",
      "Sensitive skin conditioning",
      "Oatmeal washes for itchy skin",
      "Veterinary-grade products"
    ],
    pricingDetails: "Add-on to grooming services from $10. Standalone treatments available from $55 depending on size and condition.",
    price: "From $55",
    iconType: "water"
  },
  {
    id: 3,
    title: "Feline Grooming",
    description: "Dedicated grooming for cats including clipping, bathing, and nail trimming in a calm, stress-free environment.",
    fullDescription: "Cats require a gentle, patient, and specialized approach. Our groomers are experienced in handling cats of all temperaments, providing grooming services in a quiet, secure environment to minimize stress and ensure safety.",
    features: [
      "Full coat clipping (Lion clips)",
      "Belly shaves and sanitary clips",
      "Thorough comb-outs for shedding",
      "Safe nail trimming",
      "Waterless foam options for anxious cats"
    ],
    pricingDetails: "Short hair groom from $70 | Long hair groom/clip from $90. Please note we do not provide sedation; extremely aggressive cats may need veterinary grooming.",
    price: "From $70",
    iconType: "paw"
  },
  {
    id: 4,
    title: "Full Hygiene Care",
    description: "Comprehensive care including warm hydro-bath, blow dry, nail trimming, and ear cleaning for total health and hygiene.",
    fullDescription: "Essential maintenance for a healthy, happy pet. This service includes everything needed to keep your pet clean, smelling fresh, and comfortable between full haircuts. Perfect for double-coated breeds or active dogs.",
    features: [
      "Warm hydro-bath with massage",
      "High-velocity blow dry (deshedding)",
      "Nail clipping and filing",
      "Ear cleaning and plucking",
      "Anal gland expression (on request)"
    ],
    pricingDetails: "Small dogs from $65 | Medium from $75 | Large dogs from $85. Double-coated breeds may incur extra deshedding fees.",
    price: "From $65",
    iconType: "ribbon"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Mitchell",
    petName: "Buddy",
    review: "Christine transformed my nervous rescue dog into a confident, beautifully groomed pup. Her gentle approach is amazing! We won't go anywhere else.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: 2,
    name: "James Wilson",
    petName: "Max",
    review: "The best groomer in Willunga! Max usually hates baths but he comes home happy and smelling fantastic. Highly recommended for nervous dogs.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: 3,
    name: "Emma Thompson",
    petName: "Luna",
    review: "Absolutely wonderful service. The attention to detail on Luna's schnauzer cut is perfection. The salon is clean, calm, and professional.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&h=200"
  }
];