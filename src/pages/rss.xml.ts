import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '@utils/constants';

export async function GET(context: any) {
  const posts = await getCollection('blog', ({ data }) => {
    return data.draft !== true;
  });

  const sortedPosts = posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/blog/${post.slug}/`,
      categories: [post.data.category, ...post.data.tags],
      author: post.data.author,
    })),
    customData: `<language>en-us</language>`,
  });
}
