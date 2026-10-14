export interface Slot {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface CollageLayout {
  id: string;
  label: string;
  hint: string;
  /** Background colour of the collage sheet. */
  paper: string;
  /** Gap/padding in percent, informational for thumbnails. */
  slots: Slot[];
}

const g = 2.5; // gap in %
const p = 4; // outer padding in %

/** Rects are percentages of the whole sheet. */
export const COLLAGE_LAYOUTS: CollageLayout[] = [
  {
    id: 'classic',
    label: 'Classic',
    hint: 'One large, two small',
    paper: '#fbf9f5',
    slots: [
      { x: p, y: p, w: 100 - 2 * p, h: 56 },
      { x: p, y: p + 56 + g, w: (100 - 2 * p - g) / 2, h: 100 - 2 * p - 56 - g },
      { x: p + (100 - 2 * p - g) / 2 + g, y: p + 56 + g, w: (100 - 2 * p - g) / 2, h: 100 - 2 * p - 56 - g },
    ],
  },
  {
    id: 'grid',
    label: 'Grid',
    hint: 'Four equal moments',
    paper: '#fbf9f5',
    slots: [0, 1, 2, 3].map((i) => {
      const cell = (100 - 2 * p - g) / 2;
      return { x: p + (i % 2) * (cell + g), y: p + Math.floor(i / 2) * (cell + g), w: cell, h: cell };
    }),
  },
  {
    id: 'modern',
    label: 'Modern',
    hint: 'Asymmetric and airy',
    paper: '#f1ece4',
    slots: [
      { x: 8, y: 8, w: 56, h: 52 },
      { x: 68, y: 8, w: 24, h: 24 },
      { x: 68, y: 36, w: 24, h: 24 },
      { x: 8, y: 64, w: 30, h: 28 },
      { x: 42, y: 64, w: 50, h: 28 },
    ],
  },
  {
    id: 'family',
    label: 'Family',
    hint: 'A group photo with a row below',
    paper: '#fbf9f5',
    slots: [
      { x: p, y: p, w: 100 - 2 * p, h: 52 },
      ...[0, 1, 2, 3].map((i) => {
        const cw = (100 - 2 * p - 3 * g) / 4;
        return { x: p + i * (cw + g), y: p + 52 + g, w: cw, h: 100 - 2 * p - 52 - g };
      }),
    ],
  },
  {
    id: 'wedding',
    label: 'Wedding',
    hint: 'A centre portrait, two flanking',
    paper: '#f6f1ea',
    slots: [
      { x: 6, y: 14, w: 22, h: 72 },
      { x: 31, y: 6, w: 38, h: 88 },
      { x: 72, y: 14, w: 22, h: 72 },
    ],
  },
  {
    id: 'minimal',
    label: 'Minimal',
    hint: 'Two photographs, lots of space',
    paper: '#fbf9f5',
    slots: [
      { x: 10, y: 10, w: 80, h: 38 },
      { x: 10, y: 52, w: 80, h: 38 },
    ],
  },
];

export const layoutById = (id: string) => COLLAGE_LAYOUTS.find((l) => l.id === id) ?? COLLAGE_LAYOUTS[0];
