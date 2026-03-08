import { client } from './client';

const isDev = process.env.NODE_ENV === 'development';

const mockPosts = [
  { title: 'The Art of Slow Travel', slug: { current: 'slow-travel' }, category: 'Travel', date: 'March 2024', readTime: '5 min', excerpt: 'What it means to move through the world without rushing past it.' },
  { title: 'On Living with Intention', slug: { current: 'living-with-intention' }, category: 'Lifestyle', date: 'February 2024', readTime: '4 min', excerpt: 'A meditation on curating the spaces and habits that shape us.' },
  { title: 'Ambiance as a Practice', slug: { current: 'ambiance-as-practice' }, category: 'Design', date: 'January 2024', readTime: '6 min', excerpt: 'How atmosphere becomes the invisible architecture of our days.' },
];

const mockProducts = [
  { name: 'The Journey Jacket', slug: { current: 'journey-jacket' }, price: '$220', badge: 'New', category: 'Outerwear', description: 'Built for movement. Designed to last.', gradient: 'linear-gradient(135deg, #1a1a1a, #2d2d2d)', label: 'JJ' },
  { name: 'Studio Tote', slug: { current: 'studio-tote' }, price: '$85', badge: 'Available', category: 'Accessories', description: 'Carry everything. Compromise nothing.', gradient: 'linear-gradient(135deg, #0d0d0d, #1a1a1a)', label: 'ST' },
];

const mockProjects = [
  { name: 'Visual Identity 001', slug: { current: 'visual-identity-001' }, category: 'Branding', year: '2024', description: 'Full brand identity for an independent creative studio.', gradient: 'linear-gradient(135deg, #1a1a1a, #2d2d2d)', label: 'VI' },
  { name: 'Editorial Series', slug: { current: 'editorial-series' }, category: 'Photography', year: '2024', description: 'A series of images documenting movement and stillness.', gradient: 'linear-gradient(135deg, #0d0d0d, #1a1a1a)', label: 'ES' },
];

export async function getPosts() {
  if (isDev) return mockPosts;
  return client.fetch(`*[_type == post] | order(date desc) { title, slug, category, date, readTime, excerpt, heroGradient }`);
}

export async function getPost(slug: string) {
  if (isDev) return mockPosts.find(p => p.slug.current === slug) || null;
  return client.fetch(`*[_type == post && slug.current == $slug][0]`, { slug });
}

export async function getProjects() {
  if (isDev) return mockProjects;
  return client.fetch(`*[_type == project] | order(year desc) { name, slug, category, year, tags, description, gradient, label }`);
}

export async function getProject(slug: string) {
  if (isDev) return mockProjects.find(p => p.slug.current === slug) || null;
  return client.fetch(`*[_type == project && slug.current == $slug][0]`, { slug });
}

export async function getProducts() {
  if (isDev) return mockProducts;
  return client.fetch(`*[_type == product] { name, slug, price, badge, category, description, gradient, label, specs }`);
}

export async function getProduct(slug: string) {
  if (isDev) return mockProducts.find(p => p.slug.current === slug) || null;
  return client.fetch(`*[_type == product && slug.current == $slug][0]`, { slug });
}
