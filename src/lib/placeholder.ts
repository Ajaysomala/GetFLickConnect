/**
 * Generates a deterministic SVG data-URI placeholder image.
 * No network request, no external dependency — renders instantly everywhere.
 * Same seed always produces the same gradient + icon, so each "photo slot"
 * stays visually consistent across re-renders.
 */

const PALETTES: [string, string][] = [
  ['#3A2A1F', '#1C1410'], // warm brown
  ['#1F2A3A', '#10141C'], // cool blue
  ['#2A1F1F', '#140E0E'], // ember
  ['#1F2A22', '#0E140F'], // moss
  ['#2A1F2E', '#140E16'], // plum
  ['#2E2A1F', '#16140E'], // amber dust
  ['#1F2A2A', '#0E1414'], // teal slate
  ['#2A1F26', '#140E12'], // wine
];

// A small set of camera/photography-flavored line icons, drawn directly as SVG paths.
const ICONS = [
  // camera body
  'M14 18h12l3 4h9a3 3 0 013 3v15a3 3 0 01-3 3H10a3 3 0 01-3-3V25a3 3 0 013-3h4l3-4z M22 24a7 7 0 100 14 7 7 0 000-14z',
  // film frame
  'M8 10h24v22H8z M12 10v22 M28 10v22 M8 16h4 M8 22h4 M8 28h4 M28 16h4 M28 22h4 M28 28h4',
  // drone
  'M20 14v4 M8 8l6 6 M32 8l-6 6 M8 32l6-6 M32 32l-6-6 M14 16a6 6 0 1012 0 6 6 0 00-12 0z M4 8a4 4 0 108 0 4 4 0 00-8 0z M28 8a4 4 0 108 0 4 4 0 00-8 0z M4 32a4 4 0 108 0 4 4 0 00-8 0z M28 32a4 4 0 108 0 4 4 0 00-8 0z',
  // aperture blades (simplified hexagon)
  'M20 4l13.86 8v16L20 36 6.14 28V12z M20 12l6.93 4v8L20 28l-6.93-4v-8z',
];

function hashSeed(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h << 5) - h + seed.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

/**
 * Returns a data: URI containing an SVG with a deterministic gradient
 * background and a faint icon, sized to the given dimensions.
 */
export function placeholderImage(seed: string, width = 480, height = 480): string {
  const hash = hashSeed(seed);
  const [c1, c2] = PALETTES[hash % PALETTES.length];
  const icon = ICONS[hash % ICONS.length];
  const angle = hash % 360;
  const gradId = `g${hash}`;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <linearGradient id="${gradId}" gradientTransform="rotate(${angle})">
        <stop offset="0%" stop-color="${c1}"/>
        <stop offset="100%" stop-color="${c2}"/>
      </linearGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#${gradId})"/>
    <g transform="translate(${width / 2 - 20}, ${height / 2 - 20})" opacity="0.18" stroke="#F5F3EE" stroke-width="1.3" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path d="${icon}"/>
    </g>
  </svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

/** Generates an array of N placeholder URIs sharing a base seed, each visually distinct. */
export function placeholderSet(baseSeed: string, count: number, width = 480, height = 480): string[] {
  return Array.from({ length: count }, (_, i) => placeholderImage(`${baseSeed}-${i}`, width, height));
}
