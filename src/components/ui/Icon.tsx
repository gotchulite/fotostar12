import type { SVGProps } from 'react';

export type IconName =
  | 'cart'
  | 'user'
  | 'menu'
  | 'close'
  | 'arrow-right'
  | 'arrow-left'
  | 'arrow-up-right'
  | 'check'
  | 'rotate'
  | 'plus'
  | 'minus'
  | 'crop'
  | 'upload'
  | 'camera'
  | 'image'
  | 'type'
  | 'sliders'
  | 'trash'
  | 'chevron-down'
  | 'lock'
  | 'box'
  | 'truck'
  | 'heart'
  | 'wall'
  | 'phone'
  | 'save'
  | 'alert';

const PATHS: Record<IconName, string> = {
  cart: 'M5 7h14l-1.2 11H6.2L5 7Zm3.5 0V6a3.5 3.5 0 0 1 7 0v1',
  user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8c0-3.5 3-6 7-6s7 2.5 7 6',
  menu: 'M4 8h16M4 16h16',
  close: 'M6 6l12 12M18 6 6 18',
  'arrow-right': 'M4 12h16m-6-6 6 6-6 6',
  'arrow-left': 'M20 12H4m6-6-6 6 6 6',
  'arrow-up-right': 'M7 17 17 7M9 7h8v8',
  check: 'm5 12.5 4.5 4.5L19 7.5',
  rotate: 'M20 11a8 8 0 1 0-2.3 5.7M20 5v6h-6',
  plus: 'M12 5v14M5 12h14',
  minus: 'M5 12h14',
  crop: 'M7 3v14h14M3 7h14v14',
  upload: 'M12 16V4m0 0 4 4m-4-4L8 8M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3',
  camera: 'M4 8h3l1.5-2h7L17 8h3v11H4V8Zm8 8.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z',
  image: 'M4 5h16v14H4V5Zm0 11 4.5-4.5 3.5 3.5 3-3 5 5M15.5 9.5h.01',
  type: 'M5 6V4h14v2M12 4v16m-3 0h6',
  sliders: 'M4 7h9m4 0h3M4 17h3m4 0h9M13 4v6m-6 4v6',
  trash: 'M5 7h14M9 7V4h6v3m-8 0 1 13h8l1-13',
  'chevron-down': 'm6 9 6 6 6-6',
  lock: 'M6 11h12v9H6v-9Zm3 0V8a3 3 0 0 1 6 0v3',
  box: 'M4 8l8-4 8 4v8l-8 4-8-4V8Zm0 0 8 4m0 0 8-4m-8 4v8',
  truck: 'M3 6h11v10H3V6Zm11 4h4l3 3v3h-7M7 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm10 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z',
  heart: 'M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.600-7 10-7 10Z',
  wall: 'M5 4h14v12H5V4Zm4 4h6v4H9V8ZM3 20h18',
  phone: 'M8 3h8v18H8V3Zm3 15h2',
  save: 'M5 4h11l3 3v13H5V4Zm4 0v5h6V4M8 20v-6h8v6',
  alert: 'M12 4 3 20h18L12 4Zm0 6v5m0 3h.01',
};

interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconName;
  size?: number;
}

export function Icon({ name, size = 20, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
