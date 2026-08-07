// Shared types matching Prisma models
export interface EventItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  subCategory: string | null;
  description: string;
  longDesc: string | null;
  coverImage: string;
  gallery: string[];
  eventDate: string | null;
  location: string | null;
  featured: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  type: 'photo' | 'video';
  url: string;
  thumbnail: string | null;
  youtubeId: string | null;
  description: string | null;
  eventDate: string | null;
  location: string | null;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Artist {
  id: string;
  name: string;
  role: string;
  specialty: string | null;
  bio: string | null;
  avatar: string;
  phone: string | null;
  social: Record<string, string>;
  order: number;
  featured: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Video {
  id: string;
  title: string;
  category: string;
  youtubeId: string;
  thumbnail: string | null;
  description: string | null;
  duration: string | null;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UpcomingEvent {
  id: string;
  title: string;
  category: string;
  eventDate: string;
  eventTime: string | null;
  venue: string;
  city: string | null;
  description: string | null;
  coverImage: string | null;
  bookingOpen: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string | null;
  avatar: string | null;
  rating: number;
  message: string;
  event: string | null;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  avatar: string;
  social: Record<string, string>;
  order: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  eventDate: string | null;
  eventType: string | null;
  message: string;
  status: 'new' | 'contacted' | 'closed';
  createdAt: string;
  updatedAt: string;
}

export interface SiteSettings {
  companyName?: string;
  companyNameHindi?: string;
  tagline?: string;
  taglineHindi?: string;
  tagline2?: string;
  phone?: string;
  phoneDisplay?: string;
  whatsapp?: string;
  whatsappDisplay?: string;
  email?: string;
  website?: string;
  address?: string;
  instagram?: string;
  facebook?: string;
  youtube?: string;
  instagramHandle?: string;
  youtubeChannel?: string;
  stats_events?: string;
  stats_clients?: string;
  stats_years?: string;
  stats_artists?: string;
  [k: string]: string | undefined;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export type Route =
  | 'home'
  | 'about'
  | 'events'
  | 'gallery'
  | 'artists'
  | 'videos'
  | 'testimonials'
  | 'contact'
  | 'admin';

export const EVENT_CATEGORIES = [
  { key: 'Spiritual', icon: '🛕', label: 'Spiritual Events', labelHi: 'आध्यात्मिक' },
  { key: 'Singing', icon: '🎤', label: 'Singing Events', labelHi: 'गायन' },
  { key: 'Wedding', icon: '💍', label: 'Wedding Events', labelHi: 'विवाह' },
  { key: 'Family', icon: '🎉', label: 'Family Events', labelHi: 'पारिवारिक' },
  { key: 'Corporate', icon: '🏢', label: 'Corporate Events', labelHi: 'कॉर्पोरेट' },
  { key: 'Stage Shows', icon: '🎭', label: 'Stage Shows', labelHi: 'मंच शो' },
] as const;
