export default {
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
    { name: 'category', title: 'Category', type: 'string' },
    { name: 'date', title: 'Date', type: 'string' },
    { name: 'readTime', title: 'Read Time', type: 'string' },
    { name: 'excerpt', title: 'Excerpt', type: 'text' },
    { name: 'heroGradient', title: 'Hero Gradient (CSS)', type: 'string' },
    { name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true } },
    { name: 'content', title: 'Content', type: 'array', of: [{ type: 'block' }] },
  ],
}
