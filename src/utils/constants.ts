export const SITE = {
  title: 'behitek',
  description: 'Biến nghiên cứu AI thành hệ thống thực tế.',
  url: 'https://behitek.com',
  author: 'Hieu Nguyen',
  email: 'hello@behitek.com',
};

export const SOCIAL_LINKS = {
  email: {
    label: 'Email',
    href: 'mailto:hello@behitek.com',
    icon: 'email' as const,
  },
  linkedin: {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/behitek/',
    icon: 'linkedin' as const,
  },
  github: {
    label: 'GitHub',
    href: 'https://github.com/behitek',
    icon: 'github' as const,
  },
  twitter: {
    label: 'Twitter',
    href: 'https://twitter.com/behitek_',
    icon: 'twitter' as const,
  },
};

export const NAV_LINKS = [
  { label: '~/home', href: '/' },
  { label: './services', href: '/services' },
  { label: './projects', href: '/projects' },
  { label: './ai-assistant', href: '/assistant', isNew: true },
  { label: './blog', href: '/blog' },
  { label: './about', href: '/about' },
];

