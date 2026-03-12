export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' } },
    { name: 'price', title: 'Price', type: 'string' },
    { name: 'badge', title: 'Badge', type: 'string' },
    { name: 'category', title: 'Category', type: 'string' },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'image', title: 'Main Image', type: 'image', options: { hotspot: true } },
    { name: 'image2', title: 'Image 2', type: 'image', options: { hotspot: true } },
    { name: 'image2caption', title: 'Image 2 Caption', type: 'text' },
    { name: 'image3', title: 'Image 3', type: 'image', options: { hotspot: true } },
    { name: 'image3caption', title: 'Image 3 Caption', type: 'text' },
    { name: 'label', title: 'Label', type: 'string' },
    {
      name: 'specs', title: 'Specs', type: 'array', of: [{
        type: 'object', fields: [
          { name: 'label', title: 'Label', type: 'string' },
          { name: 'value', title: 'Value', type: 'string' },
        ]
      }]
    },
  ],
}
