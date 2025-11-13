import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import remarkDirective from 'remark-directive';
import { visit } from 'unist-util-visit';
import { h } from 'hastscript';

// Custom remark plugin to handle admonitions (:::tip:::, :::warning:::, etc.)
function remarkAdmonitions() {
  return (tree) => {
    visit(tree, (node) => {
      if (
        node.type === 'textDirective' ||
        node.type === 'leafDirective' ||
        node.type === 'containerDirective'
      ) {
        const data = node.data || (node.data = {});
        const tagName = node.type === 'textDirective' ? 'span' : 'div';

        data.hName = tagName;
        data.hProperties = h(tagName, { class: `admonition admonition-${node.name}` }).properties;
      }
    });
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://behitek.com',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'vi'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    mdx(),
    sitemap(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  markdown: {
    remarkPlugins: [remarkDirective, remarkAdmonitions],
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark-dimmed',
      },
      wrap: true,
      transformers: [
        {
          name: 'add-copy-button',
          pre(node) {
            // Add a data attribute to enable copy button
            this.addClassToHast(node, 'code-block-wrapper');
          },
        },
      ],
    },
  },
});
