import { useBlogPost } from '@docusaurus/theme-common/internal';
import BlogPostItem from '@theme-original/BlogPostItem';
import { DiscussionEmbed } from 'disqus-react';
import React from 'react';

export default function BlogPostItemWrapper(props) {
  const { metadata: { frontMatter }, isBlogPostPage } = useBlogPost();
  const { comments = true, slug, title } = frontMatter;

  return (
    <>
      <BlogPostItem {...props} />
      {comments && isBlogPostPage && (
        <DiscussionEmbed
          style={{ marginTop: 50 }}
          shortname='behitek'
          config={{
            url: slug,
            identifier: slug,
            title,
            language: 'en_US',
          }}
        />
      )}
    </>
  );
}