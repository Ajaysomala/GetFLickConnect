import type { Creator } from '../types';
import { placeholderSet } from './placeholder';

export const SPECIALTY_OPTIONS = [
  'Weddings',
  'Real Estate',
  'Corporate',
  'Sports',
  'Music Videos',
  'Fashion',
  'Events',
  'Product',
];

export const CAMERA_BODY_OPTIONS = [
  'Sony FX3',
  'Sony FX6',
  'Sony A7S III',
  'Sony A7R V',
  'Canon EOS R5',
  'Canon R6 Mark II',
  'RED Komodo 6K',
  'ARRI Alexa Mini',
  'Blackmagic Pocket 6K',
];

export const LENS_OPTIONS = [
  '24-70mm f/2.8 zoom',
  '50mm f/1.2 prime',
  '85mm f/1.4 prime',
  '16-35mm wide-angle',
  '70-200mm f/2.8 telephoto',
  '35mm Anamorphic T2.9',
];

export const AUDIO_LIGHTING_OPTIONS = [
  'Rode Wireless PRO lavs',
  'Sennheiser MKE 600 shotgun',
  'Aputure Amaran 200d',
  'Nanlite PavoTube RGB',
  'DJI Mic 2 set',
  'Godox AD200 Pro strobe',
];

export const DRONE_OPTIONS = [
  'DJI Mavic 3 Pro',
  'DJI Avata 2',
  'DJI Air 3',
  'DJI Inspire 3',
];

export const SEED_CREATORS: Creator[] = [
  {
    id: 'cam-01',
    name: 'Marcus Chen',
    avatarInitials: 'MC',
    avatarColor: '#FF5A1F',
    location: 'Los Angeles, CA',
    yearsExperience: 8,
    bio: 'Cinematic storyteller specializing in luxury weddings and brand films. I shoot for emotion first, technical precision second.',
    services: 'Both',
    specialties: ['Weddings', 'Corporate', 'Music Videos'],
    certifications: ['Adobe Certified Expert — Premiere Pro'],
    gear: {
      bodies: ['Sony FX3', 'Sony A7S III'],
      lenses: ['24-70mm f/2.8 zoom', '70-200mm f/2.8 telephoto'],
      audioLighting: ['Rode Wireless PRO lavs', 'Aputure Amaran 200d'],
    },
    hasDrone: true,
    droneModel: 'DJI Mavic 3 Pro',
    isPart107Certified: true,
    hourlyRate: 150,
    reelTitle: 'Marcus Chen — Cinematic Wedding Reel 2026',
    reelId: 'reel-mc-2026',
    photos: placeholderSet('cam-01', 9),
    isAvailable: true,
    rating: 4.9,
    reviewCount: 96,
    totalEarnings: 12450,
    profileViews: 1284,
    joinedDate: '2023-03-14',
    bookings: [
      { id: 'bk-101', clientName: 'Sarah & James', date: '2026-06-28', time: '14:00', type: 'Weddings', duration: 8, status: 'accepted', totalPaid: 1200, location: 'Beverly Hills Estate, CA' },
      { id: 'bk-102', clientName: 'Apex Corp', date: '2026-07-04', time: '10:00', type: 'Corporate', duration: 4, status: 'pending', totalPaid: 600, location: 'Downtown LA Studios' },
    ],
    reviews: [
      { id: 'rv-1', clientName: 'Priya S.', rating: 5, comment: 'Marcus captured moments we did not even know happened. The drone shots of the venue were stunning.', jobType: 'Wedding' },
      { id: 'rv-2', clientName: 'Apex Corp', rating: 5, comment: 'Professional, fast turnaround, and the gear list matched exactly what was promised.', jobType: 'Corporate' },
    ],
  },
  {
    id: 'cam-02',
    name: 'Isabella Romero',
    avatarInitials: 'IR',
    avatarColor: '#3DD68C',
    location: 'Austin, TX',
    yearsExperience: 6,
    bio: 'Real estate and architectural specialist. I make properties look like editorial spreads, with aerial coverage that closes listings faster.',
    services: 'Photographer',
    specialties: ['Real Estate', 'Corporate', 'Product'],
    certifications: ['FAA Part 107', 'Matterport Certified Capture Tech'],
    gear: {
      bodies: ['Canon EOS R5', 'Canon R6 Mark II'],
      lenses: ['16-35mm wide-angle', '50mm f/1.2 prime'],
      audioLighting: ['Godox AD200 Pro strobe'],
    },
    hasDrone: true,
    droneModel: 'DJI Air 3',
    isPart107Certified: true,
    hourlyRate: 120,
    reelTitle: 'Isabella Romero — Luxury Real Estate Reel',
    reelId: 'reel-ir-2026',
    photos: placeholderSet('cam-02', 9),
    isAvailable: true,
    rating: 4.8,
    reviewCount: 64,
    totalEarnings: 8200,
    profileViews: 902,
    joinedDate: '2024-01-09',
    bookings: [
      { id: 'bk-201', clientName: 'Maple Heights Listing', date: '2026-06-20', time: '09:00', type: 'Real Estate', duration: 3, status: 'accepted', totalPaid: 480, location: 'Maple Heights, TX' },
    ],
    reviews: [
      { id: 'rv-3', clientName: 'Sotheby\'s Realty', rating: 5, comment: 'The aerial walkthrough alone got us three offers in a week.', jobType: 'Real Estate' },
    ],
  },
  {
    id: 'cam-03',
    name: 'Devon Brooks',
    avatarInitials: 'DB',
    avatarColor: '#F0B23D',
    location: 'Seattle, WA',
    yearsExperience: 5,
    bio: 'High-octane sports and music video specialist. RED Komodo for the day-to-day, FPV drone for the chase shots nobody else gets.',
    services: 'Videographer',
    specialties: ['Sports', 'Music Videos', 'Events'],
    certifications: [],
    gear: {
      bodies: ['RED Komodo 6K', 'Sony FX3'],
      lenses: ['70-200mm f/2.8 telephoto', '35mm Anamorphic T2.9'],
      audioLighting: ['Sennheiser MKE 600 shotgun', 'Nanlite PavoTube RGB'],
    },
    hasDrone: true,
    droneModel: 'DJI Avata 2',
    isPart107Certified: false,
    hourlyRate: 180,
    reelTitle: 'Devon Brooks — Action & Music Video Reel',
    reelId: 'reel-db-2026',
    photos: placeholderSet('cam-03', 9),
    isAvailable: false,
    rating: 5.0,
    reviewCount: 41,
    totalEarnings: 21300,
    profileViews: 1530,
    joinedDate: '2024-08-22',
    bookings: [
      { id: 'bk-301', clientName: 'City Marathon Coverage', date: '2026-06-22', time: '07:00', type: 'Sports', duration: 9, status: 'accepted', totalPaid: 1440, location: 'Seattle Waterfront' },
      { id: 'bk-302', clientName: 'Indie Band — Riverline', date: '2026-06-30', time: '18:00', type: 'Music Videos', duration: 10, status: 'accepted', totalPaid: 1800, location: 'Capitol Hill Studio' },
    ],
    reviews: [
      { id: 'rv-4', clientName: 'Riverline Band', rating: 5, comment: 'The FPV chase footage made the whole video. Worth every dollar.', jobType: 'Music Video' },
    ],
  },
];
