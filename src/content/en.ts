/** English copy. New strings go here first; other languages may be partial and fall back to this file. */
export const en = {
  'nav.create': 'Create',
  'nav.products': 'Products',
  'nav.send': 'Send a Memory',
  'nav.services': 'Services',
  'nav.how': 'How It Works',
  'cta.create': 'Create Your Memory',
  'cta.send': 'Send a Memory Home',
  'hero.title': 'Turn your memories into something you can hold.',
  'hero.sub':
    'Create, print and frame your favorite moments — or send a meaningful memory home to someone you love.',
  'final.title': 'Your next favorite photograph is already on your phone.',
  'send.title': 'Send a memory home.',
  'send.sub': 'Create it from anywhere. We print and frame it in Nepal and deliver it to the people you love.',
} as const;

export type CopyKey = keyof typeof en;
