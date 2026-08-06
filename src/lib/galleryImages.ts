/**
 * Curated Unsplash photography examples for the marketplace prototype.
 * Each URL is a real creative photograph — wedding, fashion, aerial, sports, etc.
 */

const u = (id: string, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

/** Full-bleed hero background */
export const HERO_IMAGE = u('photo-1492691527719-9d1e07e534b4', 1600);

/** Horizontal marquee / filmstrip portfolio examples */
export const PORTFOLIO_SHOWCASE = [
  u('photo-1519741497674-611481863552'), // wedding kiss
  u('photo-1469334031218-e382a71b716b'), // fashion runway
  u('photo-1473968512647-3e447244af8f'), // drone / aerial coast
  u('photo-1461896836934-ffe607ba6851'), // sports action
  u('photo-1470229722913-7c0e2dbbafd3'), // concert lights
  u('photo-1600596542815-ffad4c1539a9'), // luxury home
  u('photo-1531746020798-e6953c6e8e04'), // portrait
  u('photo-1523275335684-37898b6baf30'), // product
  u('photo-1511285560929-80b456fea0bc'), // wedding detail
  u('photo-1492684223066-81342ee5ff30'), // event crowd
  u('photo-1506905925346-21bda4d32df4'), // mountain aerial
  u('photo-1556761175-b413da4baf72'), // corporate team
];

/** Specialty browse tiles with cover images */
export const SPECIALTY_IMAGES: { name: string; image: string; blurb: string }[] = [
  { name: 'Weddings', image: u('photo-1519741497674-611481863552', 700), blurb: 'Day-to-night storytelling' },
  { name: 'Real Estate', image: u('photo-1600596542815-ffad4c1539a9', 700), blurb: 'Listings that close faster' },
  { name: 'Corporate', image: u('photo-1556761175-b413da4baf72', 700), blurb: 'Brand & leadership films' },
  { name: 'Sports', image: u('photo-1461896836934-ffe607ba6851', 700), blurb: 'Peak-action coverage' },
  { name: 'Events', image: u('photo-1492684223066-81342ee5ff30', 700), blurb: 'Atmosphere & moments' },
  { name: 'Aerial / Drone', image: u('photo-1473968512647-3e447244af8f', 700), blurb: 'Part 107 licensed pilots' },
  { name: 'Product', image: u('photo-1523275335684-37898b6baf30', 700), blurb: 'Studio-grade detail' },
  { name: 'Portraits', image: u('photo-1531746020798-e6953c6e8e04', 700), blurb: 'Editorial character' },
];

/** Per-creator gallery sets (9 frames each) */
export const CREATOR_GALLERIES: Record<string, string[]> = {
  'cam-01': [
    u('photo-1519741497674-611481863552'),
    u('photo-1511285560929-80b456fea0bc'),
    u('photo-1465495976277-4387d4b0b4c6'),
    u('photo-1520854221256-17451cc331bf'),
    u('photo-1469334031218-e382a71b716b'),
    u('photo-1492691527719-9d1e07e534b4'),
    u('photo-1470229722913-7c0e2dbbafd3'),
    u('photo-1516035069371-29a1b244cc32'),
    u('photo-1452587925148-ce544e77e70d'),
  ],
  'cam-02': [
    u('photo-1600596542815-ffad4c1539a9'),
    u('photo-1600585154340-be6161a56a0c'),
    u('photo-1600607687939-ce8a6c25118c'),
    u('photo-1600566753190-17f0baa2a6c3'),
    u('photo-1473968512647-3e447244af8f'),
    u('photo-1506905925346-21bda4d32df4'),
    u('photo-1523275335684-37898b6baf30'),
    u('photo-1560448204-e02f11c3d0e2'),
    u('photo-1613490493576-7fde63acd811'),
  ],
  'cam-03': [
    u('photo-1461896836934-ffe607ba6851'),
    u('photo-1470229722913-7c0e2dbbafd3'),
    u('photo-1493225457124-a3eb161ffa5f'),
    u('photo-1459749411177-049543587d3a'),
    u('photo-1574629810360-7efbbe195018'),
    u('photo-1514525253161-7a46d19cd819'),
    u('photo-1508700115892-45ecd05bd2d4'),
    u('photo-1429962714451-bb934ecdc4ec'),
    u('photo-1511671782779-c97d3d27a1d4'),
  ],
};

export function galleryFor(creatorId: string, count = 9): string[] {
  const set = CREATOR_GALLERIES[creatorId];
  if (set) return set.slice(0, count);
  return PORTFOLIO_SHOWCASE.slice(0, count);
}
