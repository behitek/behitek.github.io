export function formatDate(date: Date): string {
  return new Intl.DateFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function readingTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

export function getCategoryColor(category: string): string {
  const categoryMap: Record<string, string> = {
    'AI/ML': 'category-ai',
    'Python': 'category-python',
    'Tutorial': 'category-tutorial',
    'Data': 'category-data',
  };
  return categoryMap[category] || 'category-badge';
}

export function getLanguageInfo(lang: string): { label: string; flag: string; class: string } {
  const langMap: Record<string, { label: string; flag: string; class: string }> = {
    en: { label: 'English', flag: '🇺🇸', class: 'lang-badge-en' },
    vi: { label: 'Tiếng Việt', flag: '🇻🇳', class: 'lang-badge-vi' },
  };
  return langMap[lang] || langMap.en;
}

export function generateTableOfContents(content: string): { slug: string; text: string; depth: number }[] {
  const headings: { slug: string; text: string; depth: number }[] = [];
  const regex = /^(#{2,3})\s+(.+)$/gm;
  let match;

  while ((match = regex.exec(content)) !== null) {
    const depth = match[1].length;
    const text = match[2].trim();
    const slug = slugify(text);
    headings.push({ slug, text, depth });
  }

  return headings;
}
