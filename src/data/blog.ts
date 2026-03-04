export type Post = {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  heroGradient: string;
  content: string;
};

export const posts: Post[] = [
  {
    slug: 'kyoto',
    title: 'Finding stillness in Kyoto',
    category: 'Travel',
    date: 'February 2025',
    readTime: '8 min read',
    excerpt: 'I arrived with a spreadsheet. I left with something harder to name.',
    heroGradient: 'radial-gradient(ellipse at 40% 60%, rgba(185,100,18,0.7) 0%, rgba(130,60,8,0.4) 40%, rgba(62,28,148,0.3) 70%, rgba(7,6,13,1) 100%)',
    content: `
      <p>I arrived in Kyoto with a spreadsheet. Seventeen items. Each with a time window, a transit route, and a backup. I had optimised the trip before it began.</p>
      <p>By day two, I had abandoned the spreadsheet somewhere between Fushimi Inari and a conversation with an elderly man feeding koi in a garden I hadn't planned to visit.</p>
      <h2>The City That Doesn't Hurry</h2>
      <p>Kyoto doesn't perform itself for you. It just exists, quietly, and waits to see if you'll slow down enough to notice. The temples don't announce themselves. The best ramen is in a basement with no sign. The bamboo grove at 7am, before the tour groups arrive, is so still it feels like a held breath.</p>
      <blockquote>There is a kind of travel that is really just consumption with better lighting. And then there is the other kind, where you stop trying to capture it and just let it happen to you.</blockquote>
      <p>I found a paper shop on the third day that I spent two hours in. It wasn't on any list. I bought nothing. I just stood there looking at handmade papers in colours I don't have names for, and felt something loosen in my chest.</p>
      <h2>What the Spreadsheet Was Really For</h2>
      <p>The spreadsheet, I think, was anxiety dressed as organisation. If I planned enough, I wouldn't miss anything. But you always miss things. The question is whether you're present for what you actually find.</p>
      <p>I came back with fewer photos than any trip I've taken. I remember more of it than any trip I've taken. I'm not sure that's a coincidence.</p>
    `,
  },
  {
    slug: 'hollow-knight',
    title: 'Hollow Knight and the philosophy of getting lost',
    category: 'Review · Game',
    date: 'January 2025',
    readTime: '6 min read',
    excerpt: 'I have died to the same boss eleven times. I have never been more engaged.',
    heroGradient: 'radial-gradient(ellipse at 30% 70%, rgba(62,28,148,0.8) 0%, rgba(20,8,80,0.5) 50%, rgba(7,6,13,1) 85%)',
    content: `
      <p>I am very bad at Hollow Knight. I want to put that on record before anything else. I've died to the same boss eleven times. I have no idea where I am on the map. I am playing a game that does not tell me where to go, and I am enjoying it more than almost anything I've played in years.</p>
      <h2>A Game Built on Not Knowing</h2>
      <p>Hollow Knight doesn't hold your hand. It doesn't put a glowing marker on the thing you're supposed to do next. It drops you into a decaying insect kingdom and trusts that you'll find your way through a combination of curiosity, frustration, and increasingly careful movement.</p>
      <blockquote>The map is incomplete. The lore is fragmented. The world was here before you and it will continue without you. You are just passing through.</blockquote>
      <p>What strikes me is how this matches how things actually work. Most of the interesting stuff in life doesn't come with a waypoint. You explore, you hit walls, you find unexpected passages. You die a lot and try again slightly differently.</p>
      <h2>Why Getting Lost Is the Point</h2>
      <p>There's a design philosophy in the game called environmental storytelling — the idea that the world communicates through what you find rather than what you're told. A cluster of graves. A locked door with no key in sight. A character who says something cryptic and disappears.</p>
      <p>I think about this in the context of learning. The best things I know came from following something past the point where it made obvious sense. Staying in the unknown long enough for patterns to emerge. That's uncomfortable. It also seems to be the only way through.</p>
      <p>I'm still in the middle of the game. I've stopped trying to find the critical path. I'm just exploring. Which, as far as I can tell, is exactly what it's asking me to do.</p>
    `,
  },
  {
    slug: 'being-behind',
    title: 'On the feeling of being behind',
    category: 'Philosophy',
    date: 'December 2024',
    readTime: '4 min read',
    excerpt: 'Being behind implies there is a race. Most of the time, there isn\'t.',
    heroGradient: 'radial-gradient(ellipse at 50% 50%, rgba(62,28,148,0.65) 0%, rgba(185,100,18,0.2) 55%, rgba(7,6,13,1) 90%)',
    content: `
      <p>There is a specific kind of anxiety that arrives on a Sunday evening and presents you with a list. Things you have not started. Things others have already finished. Things you said you would do and have not yet done. The list is always longer than it should be.</p>
      <h2>The Comparison Trap</h2>
      <p>Being behind implies there is a race. It implies someone set a course, marked the checkpoints, and started a clock — and that you agreed to run it. Most of the time, you did not. The race is imaginary. The checkpoints were set by people running a different race entirely.</p>
      <blockquote>You are not behind. You are on your own route, moving at your own pace, toward something that only makes sense from where you are standing.</blockquote>
      <p>This is not a comfort I arrived at easily. It took a long time to separate the feeling of being behind from the fact of it. They feel identical. They are not.</p>
      <h2>Progress That Doesn't Look Like Progress</h2>
      <p>Some of the most important periods in my life looked, from the outside, like stagnation. Slow years. Years where nothing seemed to be happening. In retrospect they were the years where everything was being built — just underground, where no one could see it, including me.</p>
      <p>There is no finish line. There is just the next interesting thing, and then the one after that. You are not behind on arriving somewhere. You are on an excursion. The point is the journey, not the schedule.</p>
    `,
  },
  {
    slug: 'naval',
    title: 'The Almanack of Naval Ravikant — the parts that actually stuck',
    category: 'Review · Book',
    date: 'November 2024',
    readTime: '5 min read',
    excerpt: 'I don\'t read books the way I\'m supposed to. Some ideas stuck anyway.',
    heroGradient: 'radial-gradient(ellipse at 40% 50%, rgba(185,100,18,0.6) 0%, rgba(62,28,148,0.3) 55%, rgba(7,6,13,1) 90%)',
    content: `
      <p>I do not read books the way I am supposed to. I graze. I skip chapters. I come back months later and find passages I don't remember reading but have clearly absorbed. The Almanack of Naval Ravikant is the kind of book that works well for this. It is not a narrative. It is a collection of compressed ideas, and some of them are very good.</p>
      <h2>The Ideas That Stayed</h2>
      <p>Specific knowledge — the idea that the thing that makes you valuable cannot be trained. It is the weird combination of interests and experiences that is uniquely yours. You do not build it deliberately. You follow your curiosity and one day realise you know something no one else quite knows in the same way.</p>
      <blockquote>Escape competition through authenticity. No one can compete with you on being you.</blockquote>
      <p>This sounds obvious. It is not. Most people spend enormous energy trying to be better at the same things as everyone else. The returns on differentiation are far higher than the returns on incremental improvement in a crowded field.</p>
      <h2>What Felt Like Play</h2>
      <p>The other idea I keep coming back to: if it feels like work to you and play to someone else, they will outcompete you. Not because they are more talented, but because they will put in more hours without noticing.</p>
      <p>The book is free online. Read it in pieces. Let it sit. Some of it will not land until later, and that is fine.</p>
    `,
  },
  {
    slug: 'lagos',
    title: '48 hours in Lagos',
    category: 'Travel',
    date: 'October 2024',
    readTime: '7 min read',
    excerpt: 'A city that doesn\'t wait for you to be ready.',
    heroGradient: 'radial-gradient(ellipse at 60% 40%, rgba(185,100,18,0.7) 0%, rgba(130,60,8,0.4) 45%, rgba(7,6,13,1) 85%)',
    content: `<p>Coming soon — this post is still being written.</p>`,
  },
  {
    slug: 'boredom',
    title: 'Why boredom is the most underrated creative tool',
    category: 'Philosophy',
    date: 'September 2024',
    readTime: '3 min read',
    excerpt: 'We\'ve engineered boredom out of our lives. That might be a problem.',
    heroGradient: 'radial-gradient(ellipse at 50% 60%, rgba(62,28,148,0.6) 0%, rgba(185,100,18,0.2) 55%, rgba(7,6,13,1) 90%)',
    content: `<p>Coming soon — this post is still being written.</p>`,
  },
];

export function getPost(slug: string) {
  return posts.find(p => p.slug === slug);
}
