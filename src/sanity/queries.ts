import { client } from './client';

export async function getPosts() {
  return client.fetch(`*[_type == "post"] | order(date desc) { title, slug, category, date, readTime, excerpt, heroGradient }`);
}

export async function getPost(slug: string) {
  return client.fetch(`*[_type == "post" && slug.current == $slug][0]`, { slug });
}

export async function getProjects() {
  return client.fetch(`*[_type == "project"] | order(year desc) { name, slug, category, year, tags, description, gradient, label }`);
}

export async function getProject(slug: string) {
  return client.fetch(`*[_type == "project" && slug.current == $slug][0]`, { slug });
}

export async function getProducts() {
  return client.fetch(`*[_type == "product"] { name, slug, price, badge, category, description, gradient, label, specs }`);
}

export async function getProduct(slug: string) {
  return client.fetch(`*[_type == "product" && slug.current == $slug][0]`, { slug });
}
