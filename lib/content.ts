export type Book = {
  slug: string;
  title: string;
  series: string;
  position: number;
  status: 'Released' | 'Coming Soon' | 'Announced';
  releaseDate: string;
  releaseLabel: string;
  shortDescription: string;
  synopsis: string;
  quote: string;
  endorsement?: string;
  endorsementSource?: string;
  isbn?: string;
  coverClass: string;
  purchaseLinks: { label: string; url: string }[];
};

export type Character = {
  slug: string;
  name: string;
  role: string;
  group: string;
  affiliation: string;
  nationality: string;
  status: string;
  firstAppearance: string;
  description: string;
  biography: string;
  quote: string;
  fileRef: string;
};

export type Article = {
  slug: string;
  title: string;
  summary: string;
  body: string[];
  date: string;
  category: string;
  author: string;
  featured?: boolean;
};

export const siteSettings = {
  name: 'THE MYRIAD',
  tagline: 'The truth is never the whole story.',
  heroEyebrow: 'OPERATION // ACTIVE',
  heroHeading: 'EVERY SECRET HAS A BODY COUNT.',
  heroText:
    'An intelligence war is being fought in the dark. When the people protecting the truth become its targets, trust becomes the most dangerous weapon of all.',
  newsHeading: 'Latest intelligence',
  shadowverse: {
    label: 'Enter The Shadowverse',
    supportingText: 'Prefer your conspiracies supernatural?',
    url: 'https://example.com/shadowverse',
    enabled: true,
    openInNewTab: true,
  },
  socialLinks: [
    { platform: 'Instagram', label: 'Instagram', url: 'https://instagram.com' },
    { platform: 'X', label: 'X / Twitter', url: 'https://x.com' },
    { platform: 'Facebook', label: 'Facebook', url: 'https://facebook.com' },
  ],
};

export const series = [
  {
    slug: 'the-myriad-files',
    name: 'The Myriad Files',
    subtitle: 'One network. No borders. No clean exits.',
    description:
      'Across continents and inside the institutions built to keep us safe, a hidden alliance trades in leverage, silence and blood. Former intelligence officer Gabriel Wolfe is the one man who has seen enough of the pattern to know it is not coincidence.',
    quote: 'The operation was over. The consequences had only just begun.',
    status: 'Active',
  },
];

export const books: Book[] = [
  {
    slug: 'the-moscow-directive',
    title: 'The Moscow Directive',
    series: 'The Myriad Files',
    position: 1,
    status: 'Released',
    releaseDate: '2026-10-18',
    releaseLabel: '18 OCT 2026',
    shortDescription:
      'A dead courier. A vanished weapons scientist. A directive that was never meant to leave the Kremlin.',
    synopsis:
      'When a British intelligence courier is found dead in Vienna with a string of coordinates hidden beneath his skin, former field officer Gabriel Wolfe is pulled back into a world he swore he had left. The trail leads from Whitehall to Moscow, and to a weapons programme capable of rewriting the balance of power. Every agency wants it. Someone inside MI6 is helping them.',
    quote: 'You do not survive this profession by trusting the right people. You survive by doubting everyone.',
    endorsement: 'A cold-blooded, globe-spanning thriller with a frightening pulse.',
    endorsementSource: 'Advance reader',
    isbn: '978-1-7390012-0-7',
    coverClass: 'cover-moscow',
    purchaseLinks: [
      { label: 'Buy the book', url: 'https://www.amazon.co.uk' },
      { label: 'Find a retailer', url: 'https://www.bookshop.org' },
    ],
  },
  {
    slug: 'ghost-protocol',
    title: 'Ghost Protocol',
    series: 'The Myriad Files',
    position: 2,
    status: 'Coming Soon',
    releaseDate: '2027-05-21',
    releaseLabel: '21 MAY 2027',
    shortDescription:
      'A covert team erased from the record returns with a final mission—and a list of names.',
    synopsis:
      'A deniable operation in the Baltic goes catastrophically wrong. Six years later, one of the operatives presumed dead walks into a London embassy and asks for Gabriel Wolfe by name. She carries proof of a programme that turns loyal agents into invisible assassins. The programme is still active, and its next target is already moving.',
    quote: 'Officially, the team never existed. Unofficially, it had just declared war.',
    endorsement: 'Taut, intelligent and brutally contemporary.',
    endorsementSource: 'J. R. Haldane',
    isbn: '978-1-7390012-1-4',
    coverClass: 'cover-ghost',
    purchaseLinks: [{ label: 'Pre-order', url: 'https://www.amazon.co.uk' }],
  },
  {
    slug: 'the-black-atlas',
    title: 'The Black Atlas',
    series: 'The Myriad Files',
    position: 3,
    status: 'Announced',
    releaseDate: '2028-01-01',
    releaseLabel: '2028',
    shortDescription:
      'The map does not show borders. It shows who owns them.',
    synopsis:
      'A stolen intelligence atlas exposes the pressure points of every major government in Europe. With ministers falling and military alliances splintering, Gabriel must find the architect of a conspiracy designed not to conquer nations, but to make them surrender themselves.',
    quote: 'Power is not territory. Power is knowing which line will break first.',
    coverClass: 'cover-atlas',
    purchaseLinks: [],
  },
];

export const characterGroups = [
  {
    name: 'Operatives',
    description: 'Field assets, handlers and the people sent where governments cannot be seen.',
  },
  {
    name: 'Intelligence',
    description: 'Analysts and directors who decide which truths reach daylight.',
  },
  {
    name: 'Antagonists',
    description: 'Adversaries whose motives are rarely as simple as their methods.',
  },
];

export const characters: Character[] = [
  {
    slug: 'gabriel-wolfe',
    name: 'Gabriel Wolfe',
    role: 'Former SIS Field Officer',
    group: 'Operatives',
    affiliation: 'Independent / SIS reserve',
    nationality: 'British',
    status: 'Active',
    firstAppearance: 'The Moscow Directive',
    description: 'A field officer who left the service, but never escaped its unfinished business.',
    biography:
      'Gabriel Wolfe spent twelve years inside the Secret Intelligence Service, operating across Eastern Europe and the Middle East. Precise, observant and difficult to deceive, he resigned after an operation in Sarajevo ended with the death of his team. He now works outside official structures, where his instinct for patterns makes him uniquely dangerous to The Myriad.',
    quote: 'There is no such thing as being out. There is only being useful somewhere else.',
    fileRef: 'OP-01 / WOLFE-G',
  },
  {
    slug: 'amara-vale',
    name: 'Dr Amara Vale',
    role: 'Signals Intelligence Director',
    group: 'Intelligence',
    affiliation: 'GCHQ',
    nationality: 'British',
    status: 'Restricted',
    firstAppearance: 'The Moscow Directive',
    description: 'A cryptanalyst who can find intent inside noise—and knows when the data is lying.',
    biography:
      'Amara Vale runs a compartmentalised signals unit tasked with tracking hostile state networks. Her models first identified The Myriad as a pattern of absences: transmissions that should exist but did not. She trusts evidence over institutions and Wolfe only when the two point in the same direction.',
    quote: 'Silence is not empty. It is curated.',
    fileRef: 'SIG-12 / VALE-A',
  },
  {
    slug: 'elias-voss',
    name: 'Elias Voss',
    role: 'Strategic Broker',
    group: 'Antagonists',
    affiliation: 'Unknown',
    nationality: 'Classified',
    status: 'At large',
    firstAppearance: 'Ghost Protocol',
    description: 'A negotiator without a country, retained by people whose names never appear on paper.',
    biography:
      'Elias Voss moves between private intelligence, state power and organised crime without belonging to any of them. He does not create conflict; he identifies the moment conflict becomes inevitable and sells both sides the means to survive it.',
    quote: 'Everyone has a price. Money is simply the least interesting version of it.',
    fileRef: 'THR-07 / VOSS-E',
  },
];

export const articles: Article[] = [
  {
    slug: 'ghost-protocol-cover-reveal',
    title: 'Ghost Protocol: cover and release date revealed',
    summary:
      'The second Myriad Files novel arrives on 21 May 2027. See the new cover and read the first mission briefing.',
    body: [
      'The next operation is live. Ghost Protocol, the second novel in The Myriad Files, will be published on 21 May 2027.',
      'The story follows the return of a covert unit erased from every official record—and the intelligence programme that was built from its failure. Gabriel Wolfe is forced to confront an operation he thought had died with his former team.',
      'Pre-orders are now open through selected retailers. Further extracts and behind-the-scenes material will be released in the months ahead.',
    ],
    date: '21 MAY 2026',
    category: 'Release',
    author: 'The Myriad Desk',
    featured: true,
  },
  {
    slug: 'inside-the-moscow-directive',
    title: 'Inside the operation: building The Moscow Directive',
    summary:
      'Toby Crome on research, operational detail and creating an espionage world that feels uncomfortably close.',
    body: [
      'The Moscow Directive began with a simple question: what happens when a government discovers that one of its most guarded secrets is no longer its own?',
      'Research ranged from diplomatic history and signals intelligence to the quiet routines of people who move sensitive information across borders. The goal was never to display the research, but to make every decision carry real weight.',
    ],
    date: '04 APR 2026',
    category: 'Field Notes',
    author: 'Toby Crome',
  },
  {
    slug: 'the-myriad-files-announced',
    title: 'The Myriad Files announced',
    summary:
      'A new sequence of international espionage thrillers begins with The Moscow Directive.',
    body: [
      'The Myriad Files is a new thriller series following former intelligence officer Gabriel Wolfe through a chain of operations connected by one hidden adversary.',
      'Each novel stands as a complete mission while revealing another part of the larger conspiracy.',
    ],
    date: '12 JAN 2026',
    category: 'Announcement',
    author: 'The Myriad Desk',
  },
];

export const products = [
  {
    name: 'The Moscow Directive',
    subtitle: 'Signed hardback',
    category: 'Signed editions',
    price: '£24.00',
    availability: 'In stock',
    description: 'First-edition hardback, signed by Toby Crome and supplied with an operation-file art card.',
    coverClass: 'cover-moscow',
    purchaseUrl: 'https://www.amazon.co.uk',
  },
  {
    name: 'Ghost Protocol',
    subtitle: 'Hardback pre-order',
    category: 'Books',
    price: '£20.00',
    availability: 'Pre-order',
    description: 'Reserve the second Myriad Files novel ahead of publication on 21 May 2027.',
    coverClass: 'cover-ghost',
    purchaseUrl: 'https://www.amazon.co.uk',
  },
  {
    name: 'Black Atlas',
    subtitle: 'Archival intelligence print',
    category: 'Prints',
    price: '£28.00',
    availability: 'Limited',
    description: 'A2 monochrome operation map printed on heavyweight uncoated stock.',
    coverClass: 'cover-atlas',
    purchaseUrl: 'https://www.etsy.com',
  },
];

export const about = {
  shortBio:
    'Toby Crome writes contemporary espionage thrillers about the systems we trust, the secrets they keep and the people sent to protect them.',
  fullBio:
    'Drawn to stories that turn geopolitics into personal consequence, Toby combines meticulous research with fast, character-led storytelling. His work explores the moral pressure placed on intelligence officers, soldiers and analysts when the correct decision is no longer the safe one.',
  origin:
    'The Myriad began with an image: a man arriving at a railway station with information that could destabilise three governments, and no idea which service had sent the person waiting for him. From that single exchange grew a network of operations spanning Europe, the Middle East and beyond.',
  influences:
    'Cold War tradecraft, contemporary intelligence reporting, military history and the lean moral tension of the great international thrillers.',
  quote: 'The best thriller question is not “what happens next?” It is “who benefits if it does?”',
};

export function findBook(slug: string) {
  return books.find((book) => book.slug === slug);
}

export function findCharacter(slug: string) {
  return characters.find((character) => character.slug === slug);
}

export function findArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}
