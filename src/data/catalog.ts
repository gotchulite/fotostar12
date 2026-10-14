import type { Finish, Frame, Mat, PrintSize, Shape } from '@/types';

/** MOCK DATA — all prices are placeholders in NPR until the studio supplies real figures. */

export const SHAPES: Shape[] = [
  { id: 'iso', label: 'A-series', hint: 'A5 to A2, the everyday standard' },
  { id: 'classic', label: 'Classic 3:2', hint: 'Matches most camera photos' },
  { id: 'portrait45', label: 'Portrait 4:5', hint: 'Slightly squarer, good for people' },
  { id: 'square', label: 'Square', hint: 'Balanced, modern' },
];

export const SIZES: PrintSize[] = [
  { id: 'a5', shape: 'iso', label: 'A5', w: 14.8, h: 21, minShortSidePx: 1000, printPrice: 180 },
  { id: 'a4', shape: 'iso', label: 'A4', w: 21, h: 29.7, minShortSidePx: 1500, printPrice: 320 },
  { id: 'a3', shape: 'iso', label: 'A3', w: 29.7, h: 42, minShortSidePx: 2100, printPrice: 640 },
  { id: 'a2', shape: 'iso', label: 'A2', w: 42, h: 59.4, minShortSidePx: 3000, printPrice: 1250 },

  { id: 'c4x6', shape: 'classic', label: '4 × 6 in', w: 10, h: 15, minShortSidePx: 800, printPrice: 60 },
  { id: 'c20', shape: 'classic', label: '20 × 30', w: 20, h: 30, minShortSidePx: 1400, printPrice: 280 },
  { id: 'c30', shape: 'classic', label: '30 × 45', w: 30, h: 45, minShortSidePx: 2100, printPrice: 680 },
  { id: 'c40', shape: 'classic', label: '40 × 60', w: 40, h: 60, minShortSidePx: 2800, printPrice: 1180 },

  { id: 'p20', shape: 'portrait45', label: '20 × 25', w: 20, h: 25, minShortSidePx: 1400, printPrice: 250 },
  { id: 'p30', shape: 'portrait45', label: '30 × 37.5', w: 30, h: 37.5, minShortSidePx: 2100, printPrice: 560 },
  { id: 'p40', shape: 'portrait45', label: '40 × 50', w: 40, h: 50, minShortSidePx: 2800, printPrice: 980 },

  { id: 's15', shape: 'square', label: '15 × 15', w: 15, h: 15, minShortSidePx: 1000, printPrice: 150 },
  { id: 's20', shape: 'square', label: '20 × 20', w: 20, h: 20, minShortSidePx: 1400, printPrice: 240 },
  { id: 's30', shape: 'square', label: '30 × 30', w: 30, h: 30, minShortSidePx: 2100, printPrice: 520 },
  { id: 's40', shape: 'square', label: '40 × 40', w: 40, h: 40, minShortSidePx: 2800, printPrice: 900 },
];

export const FINISHES: Finish[] = [
  { id: 'matte', label: 'Matte', hint: 'Soft, no glare. Best for framing.', priceFactor: 1 },
  { id: 'lustre', label: 'Lustre', hint: 'Subtle sheen, rich colour.', priceFactor: 1.08 },
  { id: 'gloss', label: 'Gloss', hint: 'Vivid and bright, shows fingerprints.', priceFactor: 1.05 },
  { id: 'fineart', label: 'Fine art', hint: 'Textured cotton paper, gallery feel.', priceFactor: 1.35 },
];

export const FRAMES: Frame[] = [
  { id: 'black', label: 'Black', hint: 'Clean and graphic', widthCm: 1.8, perCm: 9, base: 220, suggestedMat: 'thin' },
  { id: 'white', label: 'White', hint: 'Light, airy rooms', widthCm: 1.8, perCm: 9, base: 220, suggestedMat: 'thin' },
  { id: 'natural', label: 'Natural wood', hint: 'Warm and organic', widthCm: 2.2, perCm: 12, base: 280, suggestedMat: 'thin' },
  { id: 'dark', label: 'Dark wood', hint: 'Deep, traditional', widthCm: 2.4, perCm: 13, base: 300, suggestedMat: 'thin' },
  { id: 'premium', label: 'Premium', hint: 'Solid hardwood, brass inner edge', widthCm: 3, perCm: 20, base: 450, suggestedMat: 'wide' },
  { id: 'gallery', label: 'Gallery', hint: 'Slim frame, wide mat', widthCm: 1.2, perCm: 14, base: 350, suggestedMat: 'wide' },
];

export const MATS: Mat[] = [
  { id: 'none', label: 'No mat', widthCm: 0, color: '#ffffff', perCm2: 0 },
  { id: 'thin', label: 'Thin border', widthCm: 1.5, color: '#f6f3ee', perCm2: 0.18 },
  { id: 'wide', label: 'Wide mat', widthCm: 4, color: '#f6f3ee', perCm2: 0.18 },
  { id: 'black', label: 'Black mat', widthCm: 3, color: '#1f1e1c', perCm2: 0.2 },
];

export const PACKAGING = [
  { id: 'standard', label: 'Careful standard', hint: 'Protective corners and rigid box', price: 0 },
  { id: 'gift', label: 'Gift box', hint: 'Wrapped, with ribbon and note card', price: 350 },
] as const;

export const DELIVERY_METHODS = [
  { id: 'standard', label: 'Standard delivery', hint: 'Tracked, door to door', price: 250 },
  { id: 'express', label: 'Priority delivery', hint: 'Handled first, faster courier where available', price: 550 },
] as const;

export const OCCASIONS = ['Birthday', 'Anniversary', 'Dashain', 'Tihar', 'Just because'] as const;

export const RELATIONSHIPS = ['Mother', 'Father', 'Sibling', 'Grandparent', 'Friend', 'Other'] as const;

export const COUNTRIES = [
  'Australia',
  'United Kingdom',
  'United States',
  'Canada',
  'Japan',
  'South Korea',
  'United Arab Emirates',
  'Qatar',
  'Malaysia',
  'Germany',
  'Other',
];

export const CURRENCIES = [
  { code: 'NPR', symbol: 'Rs', rate: 1, label: 'Nepali rupee' },
  /** Indicative placeholder rates, replace with a real rates service later. */
  { code: 'USD', symbol: '$', rate: 0.0075, label: 'US dollar' },
  { code: 'AUD', symbol: 'A$', rate: 0.0115, label: 'Australian dollar' },
  { code: 'GBP', symbol: '£', rate: 0.0058, label: 'Pound sterling' },
] as const;

export const sizeById = (id: string) => SIZES.find((s) => s.id === id) ?? SIZES[1];
export const frameById = (id: string) => FRAMES.find((f) => f.id === id);
export const matById = (id: string) => MATS.find((m) => m.id === id) ?? MATS[0];
export const finishById = (id: string) => FINISHES.find((f) => f.id === id) ?? FINISHES[0];
export const sizesForShape = (shape: string) => SIZES.filter((s) => s.shape === shape);
