export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' } },
    { name: 'category', title: 'Category', type: 'string' },
    { name: 'year', title: 'Year', type: 'string' },
    { name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'gradient', title: 'Gradient (CSS)', type: 'string' },
    { name: 'label', title: 'Label', type: 'string' },
    { name: 'overview', title: 'Overview', type: 'text' },
    { name: 'tools', title: 'Tools', type: 'array', of: [{ type: 'string' }] },
    { name: 'outcomes', title: 'Outcomes', type: 'array', of: [{ type: 'string' }] },
  ],
}
