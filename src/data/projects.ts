export type Project = {
  slug: string;
  name: string;
  category: string;
  year: string;
  tags: string[];
  description: string;
  gradient: string;
  label: string;
  overview: string;
  tools: string[];
  outcomes: string[];
};

export const projects: Project[] = [
  {
    slug: 'orbit-poster-series',
    name: 'Orbit Poster Series',
    category: 'Graphic Design',
    year: '2024',
    tags: ['6 Pieces', 'Personal'],
    description: 'A series of spatial gradient posters exploring depth, colour tension, and the aesthetics of the void.',
    gradient: 'radial-gradient(ellipse at 30% 50%, rgba(185,100,18,0.65) 0%, rgba(62,28,148,0.35) 60%, rgba(7,6,13,1) 100%)',
    label: 'ORBIT SERIES',
    overview: 'Orbit is a personal exploration of spatial gradients as a compositional language. Each poster treats colour as mass — objects with weight, distance, and gravitational pull on one another. The brief was self-set: six posters, each using only two hues from the Xcursion palette, no typography beyond a single numeral.',
    tools: ['Figma', 'Custom Grain', 'Print-ready PDF', 'Xcursion Palette'],
    outcomes: [
      'A reusable visual language that now underpins the broader Xcursion design system.',
      'Three of the six posters adapted for use as animated backgrounds on this website.',
      'Established the amber & indigo tension as the defining characteristic of the Xcursion aesthetic.',
    ],
  },
  {
    slug: 'xcursion-brand',
    name: 'Xcursion Brand Identity',
    category: 'Branding',
    year: '2024',
    tags: ['Full System', 'Ongoing'],
    description: 'Full brand system — wordmark, colour palette, type hierarchy, and motion language.',
    gradient: 'linear-gradient(135deg, rgba(62,28,148,0.6) 0%, rgba(185,100,18,0.3) 100%)',
    label: 'XCURSION',
    overview: 'The Xcursion identity needed to feel like the philosophy: unhurried, considered, willing to occupy space without filling it. The system covers wordmark, typographic hierarchy, colour palette, motion principles, and surface applications across web and print.',
    tools: ['Figma', 'Cormorant Garamond', 'Cormorant SC', 'DM Mono', 'CSS Variables'],
    outcomes: [
      'A coherent visual identity that scales from a web cursor to a printed poster without losing fidelity.',
      'Type and colour system adopted across website, merchandise, and all published content.',
      'Motion language — grain, blob animation, fade transitions — codified as reusable CSS patterns.',
    ],
  },
  {
    slug: 'habitquest',
    name: 'HabitQuest',
    category: 'Code · App',
    year: '2024',
    tags: ['React · Vite', 'Live'],
    description: 'A gamified habit tracker. Characters, quests, XP — because spreadsheets don\'t spark joy.',
    gradient: 'radial-gradient(ellipse at 40% 55%, rgba(185,100,18,0.6) 0%, rgba(62,28,148,0.3) 55%, rgba(7,6,13,1) 90%)',
    label: 'HABITQUEST',
    overview: 'HabitQuest started from a simple frustration: every habit tracker feels like a productivity spreadsheet. The idea was to graft genuine RPG mechanics onto habit formation. Complete your daily habits, earn XP, level up your character, unlock quests.',
    tools: ['React', 'Vite', 'JavaScript', 'CSS Modules', 'LocalStorage', 'Figma'],
    outcomes: [
      'Shipped a working MVP with character progression, daily habit tracking, and a quest board.',
      'Personal daily active use for 4+ months — the strongest signal a personal project can give.',
      'Architecture is clean enough to extend: multiplayer streaks and social quests are the next phase.',
    ],
  },
  {
    slug: 'xcursion-site',
    name: 'This Site',
    category: 'Code · Web',
    year: '2024',
    tags: ['Next.js', 'Live'],
    description: 'Hand-coded from scratch. Custom cursor, scroll engine, no templates.',
    gradient: 'radial-gradient(ellipse at 50% 50%, rgba(62,28,148,0.55) 0%, rgba(185,100,18,0.2) 55%, rgba(7,6,13,1) 90%)',
    label: 'XCURSION.COM',
    overview: 'The challenge: build a site that feels as considered as the brand it represents. The result is a full-screen sectioned scroll experience with grain overlay, custom cursor with lag interpolation, and a smooth section transition system. Every interaction is intentional.',
    tools: ['Next.js', 'TypeScript', 'CSS', 'React', 'Vercel'],
    outcomes: [
      'A live site that loads fast, runs smooth, and looks nothing like a template.',
      'Migrated from vanilla HTML to Next.js for instant client-side navigation.',
      'Scalable architecture: blog, shop, and project sub-pages slot in cleanly as dynamic routes.',
    ],
  },
];

export function getProject(slug: string) {
  return projects.find(p => p.slug === slug);
}
