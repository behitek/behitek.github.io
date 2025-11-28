import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    author: z.string().default('Hieu Nguyen'),
    language: z.enum(['en', 'vi']).default('en'),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  type: 'data',
  schema: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    category: z.enum(['Product', 'Research', 'Tutorial', 'Tool', 'Fun']),
    tech: z.array(z.string()),
    image: z.string().optional(),
    images: z.array(z.string()).optional(),
    links: z.object({
      website: z.string().url().optional(),
      github: z.string().url().optional(),
      blog: z.string().optional(),
    }).optional(),
    featured: z.boolean().default(false),
    order: z.number().default(999),
  }),
});

export const collections = { blog, projects };
