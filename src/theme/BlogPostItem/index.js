import { useBlogPost } from '@docusaurus/theme-common/internal'
import BlogPostItem from '@theme-original/BlogPostItem'
import { DiscussionEmbed } from 'disqus-react'
import React from 'react'

export default function BlogPostItemWrapper(props) {
  const { metadata } = useBlogPost()
  const { frontMatter, slug, title } = metadata
  const { comments = true } = frontMatter

  return (
    <>
      <BlogPostItem {...props} />
      {comments && (
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
  )
}