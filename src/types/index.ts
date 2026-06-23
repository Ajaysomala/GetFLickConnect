export type ServiceType = 'Videographer' | 'Photographer' | 'Both';
export type BookingStatus = 'pending' | 'accepted' | 'completed' | 'cancelled';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'client' | 'creator';
}

export interface Booking {
  id: string;
  clientName: string;
  date: string;
  time: string;
  type: string;
  duration: number;
  status: BookingStatus;
  totalPaid: number;
  location: string;
}

export interface Review {
  id: string;
  clientName: string;
  rating: number;
  comment: string;
  jobType: string;
}

export interface Gear {
  bodies: string[];
  lenses: string[];
  audioLighting: string[];
}

export interface Creator {
  id: string;
  name: string;
  avatarInitials: string;
  avatarColor: string;
  location: string;
  yearsExperience: number;
  bio: string;
  services: ServiceType;
  specialties: string[];
  certifications: string[];
  gear: Gear;
  hasDrone: boolean;
  droneModel?: string;
  isPart107Certified: boolean;
  hourlyRate: number;
  reelTitle: string;
  reelId: string;
  photos: string[];
  isAvailable: boolean;
  rating: number;
  reviewCount: number;
  totalEarnings: number;
  profileViews: number;
  bookings: Booking[];
  reviews: Review[];
  joinedDate: string;
  phone?: string;
  email?: string;
}