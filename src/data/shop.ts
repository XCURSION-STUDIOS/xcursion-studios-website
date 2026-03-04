export type Product = {
  slug: string;
  name: string;
  price: string;
  badge: string;
  category: string;
  description: string;
  gradient: string;
  label: string;
  specs: { label: string; value: string }[];
};

export const products: Product[] = [
  {
    slug: 'explorer-tee',
    name: 'The Explorer Tee',
    price: '£35',
    badge: 'In Stock',
    category: 'Heavyweight Cotton · Unisex',
    description: 'Built for movement. 100% heavyweight cotton with a relaxed silhouette — the kind of tee that gets better with every wash. Printed with the Xcursion wordmark in faded ink on the chest.',
    gradient: 'radial-gradient(ellipse at 35% 55%, rgba(185,100,18,0.22) 0%, rgba(62,28,148,0.15) 55%, transparent 90%)',
    label: 'I',
    specs: [
      { label: 'Material', value: '100% Heavyweight Cotton' },
      { label: 'Fit',      value: 'Relaxed / Unisex' },
      { label: 'Sizes',    value: 'XS – XXL' },
      { label: 'Print',    value: 'Faded chest wordmark' },
      { label: 'Colour',   value: 'Washed Black' },
    ],
  },
  {
    slug: 'orbit-tee',
    name: 'The Orbit Tee',
    price: '£40',
    badge: 'Limited Run',
    category: 'Premium Slim Fit · Limited Run',
    description: 'A slimmer cut with a cleaner finish. Same Xcursion philosophy, different silhouette. Embroidered logo on the left chest — no screen print, just clean fabric and careful construction.',
    gradient: 'radial-gradient(ellipse at 65% 40%, rgba(62,28,148,0.28) 0%, rgba(185,100,18,0.12) 55%, transparent 90%)',
    label: 'II',
    specs: [
      { label: 'Material', value: 'Premium Cotton Blend' },
      { label: 'Fit',      value: 'Slim / Structured' },
      { label: 'Sizes',    value: 'XS – XL (limited stock)' },
      { label: 'Detail',   value: 'Embroidered chest logo' },
      { label: 'Colour',   value: 'Off-Black / Midnight' },
    ],
  },
];

export function getProduct(slug: string) {
  return products.find(p => p.slug === slug);
}
