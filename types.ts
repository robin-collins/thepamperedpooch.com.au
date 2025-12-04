export interface Service {
  id: number;
  title: string;
  description: string;
  fullDescription?: string;
  features?: string[];
  pricingDetails?: string;
  price?: string;
  iconType: 'scissors' | 'water' | 'paw' | 'ribbon';
}

export interface Testimonial {
  id: number;
  name: string;
  petName: string;
  review: string;
  rating: number;
  image: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface BusinessInfo {
  address: string;
  postalAddress?: string;
  phone: string;
  phoneDisplay: string;
  fax?: string;
  email: string;
  hours: string[];
}