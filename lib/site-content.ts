const asset = (path: string) => encodeURI(path);

export type CampaignSlide = {
  label: string;
  title: string;
  description: string;
  image?: string;
  alt?: string;
};

export const CAMPAIGN_SLIDES: readonly CampaignSlide[] = [
  {
    label: "Official flyer",
    title: "The Sovereign Entrepreneur",
    description: "KES 2026 campaign artwork",
    image: asset("/editions/kes-2026-official-flyer.jpg"),
    alt: "KES 2026 The Sovereign Entrepreneur official flyer",
  },
  // {
  //   label: "Coming soon",
  //   title: "Speaker Reveal",
  //   description: "The next KES 2025 speaker announcement will appear here.",
  //    image: asset("/editions/kes-2025-official-flyer.jpg"),
  //   alt: "KES 2025  official flyer",
  // },
  // {
  //   label: "Coming soon",
  //   title: "Programme Reveal",
  //   description: "The official programme and session artwork will appear here.",
  //    image: asset("/editions/kes-2023-official-flyer.jpg"),
  //   alt: "KES 2023 UpSurge official flyer",
  // },
  // {
  //   label: "Coming soon",
  //   title: "Final Countdown",
  //   description: "The final registration campaign artwork will appear here.",
  //    image: asset("/editions/kes-2020-official-flyer.jpg"),
  //   alt: "KES 2020 The Sovereign Entrepreneur official flyer",
  // },
];

export const ABOUT_KES = {
  mandate:
    "To raise believers who excel in the marketplace, build sustainable wealth, and use their influence to shape culture and advance the Kingdom.",
  vision:
    "Believers who excel in the marketplace, build lasting wealth, and use their influence to advance God's Kingdom while transforming society.",
  mission:
    "Equipping believers in the marketplace with the skills, mentorship, and platforms to thrive in business and career, while raising Kingdom financiers who steward wealth for greater impact.",
} as const;

export const PILLARS = [
  {
    number: "01",
    title: "Excellence & Integrity",
    description:
      "Raising believers who stand out in their field, with success built on godly values rather than shortcuts.",
  },
  {
    number: "02",
    title: "Leadership & Wealth",
    description:
      "Preparing entrepreneurs to shape industries, with practical strategies for growth that actually holds.",
  },
  {
    number: "03",
    title: "Kingdom Financing",
    description:
      "Empowering believers to steward wealth toward projects that fund real, lasting societal impact.",
  },
] as const;

export const SPEAKERS = [
  {
    role: "Speaker · Session 1",
    name: "Dr. Abiodun Oluwatobi",
    topic: "Influence as Currency",
    bio: "Abiodun Oluwatobi is an international sales and marketing consultant, strategist, entrepreneur, author, and speaker dedicated to helping individuals and businesses achieve measurable growth. Through innovative programs and digital courses, he has empowered thousands to attract global clients, build sustainable income, and scale profitably, combining strategy, integrity, faith, and digital transformation.",
    initials: "AO",
    image: "/speakers/abiodun_oluwatobi.jpeg",
    imageAlt: "Dr. Abiodun Oluwatobi, KES 2026 speaker",
  },
  {
    role: "Speaker · Session 2",
    name: "Segun Adelaja",
    topic: "Audacity to Build",
    bio: "Segun Adelaja is an architect, entrepreneur, and creative professional with experience spanning architecture, technology, education, real estate, construction, and media. He serves as Executive Director of Morning Star Group of Schools and Creative Lead at Dezignloft Creative Ltd, combining creativity, lifelong learning, and entrepreneurial experience to build impactful ventures.",
    initials: "SA",
    image: "/speakers/segun_adelaja.png",
    imageAlt: "Segun Adelaja, KES 2026 speaker",
  },
  {
    role: "Worship Minister",
    name: "Precious Adewa",
    topic: "Worship Interlude",
    bio: "Precious Adewa (Ebunpraise) is a Gospel music minister, certified Nurse-Midwife, counsellor, and CEO of PRESH-RUBY Events. She is the convener of the Holy Ghost Invasion Worship Encounter and is passionate about leading people into meaningful encounters with God, inspiring purposeful living, serving humanity, and creating memorable experiences through faith, worship, and creativity.",
    initials: "ME",
    image: "/speakers/ebunpraise.png",
    imageAlt: "Min. Ebunpraise, KES 2026 worship minister",
  },
  {
    role: "Compere",
    name: "Mary Ajobo",
    topic: " KES 2026 Compere",
    bio: "Mary Ajobo is a dynamic Nigerian media personality, professional compere, and public speaker who powerfully bridges entertainment and advocacy. Co-host of Zion Kulture on Mount Zion Radio and a faith-based film actress, she uses her vibrant voice and platform to champion global health equity and female empowerment across diverse audiences.",
    initials: "MA",
    image: "/speakers/mary_ajobo.png",
    imageAlt: "Mary Ajobo, KES 2026 compere",
  },
  {
    role: "Convener · Closing Session",
    name: "Taiwo Adewa",
    topic: "Kingdom Authority & the Legacy Mandate",
    bio: "Taiwo Adewa is a perioperative nurse, brand strategist, and founder of Oclick Media. A multipotentialite himself, he helps believers and entrepreneurs discern purpose and build aligned, profitable systems. He convenes Kingdom Entrepreneurs Summit, now in its fourth year, empowering marketplace leaders for influence, legacy, and kingdom impact.",
    initials: "TA",
    featured: true,
    image: "/speakers/taiwo_adewa.jpeg",
    imageAlt: "Taiwo Adewa, KES 2026 convener",
  },
] as const;

export const RUNNING_ORDER = [
  {
    number: "01",
    title: "Influence as Currency",
    type: "Session 1",
    description:
      "The Entrepreneur’s Blueprint for Building Brands, Skills & Sustainable Growth.",
      // "Speaker session · The entrepreneur's blueprint for building brands, skills, and sustainable growth.",
  },
  {
    number: "02",
    title: "Audacity to Build",
    type: "Session 2",
    description:
      "Creating a Legacy of Generational Impact.",
      // "Speaker session · Making bold decisions in uncertain markets.",
  },
  {
    number: "03",
    title: "Firechat",
    type: "Panel",
    description: "Open floor · Direct questions to the speakers and panelists.",
  },
  {
    number: "04",
    title: "Worship",
    type: "Interlude",
    description: "Led by Precious Adewa, ahead of the closing session.",
  },
  {
    number: "05",
    title: "Kingdom Authority & the Legacy Mandate",
    type: "Session 3",
    description:
      "Closing session with Taiwo Adewa · Purpose, stewardship, integrity, and building what outlives the founder. Impartation to close.",
    featured: true,
  },
] as const;

export const JOURNEY = [
  {
    year: "2020",
    title: "KES 1.0: Maiden Edition",
    description: "The beginning of the Kingdom Entrepreneurs Summit journey.",
  },
  {
    year: "2023",
    title: "KES 2.0: Empowered for Wealth",
    description:
      "Ibadan · A renewed focus on wealth creation and marketplace impact.",
  },
  {
    year: "2025",
    title: "KES 3.0: Upsurge",
    description:
      "Harnessing skills, strategy, and supernatural advantage in the marketplace.",
  },
  {
    year: "2026",
    title: "The Sovereign Entrepreneur",
    description: "Influence. Audacity. Legacy.",
    current: true,
  },
] as const;

const KES_2025_MOMENTS = [
  ["1.jpeg", "The room fills for the opening session"],
  ["2.jpeg", "Teaching from the main stage"],
  ["3.jpeg", "A marketplace lesson in progress"],
  ["4.jpeg", "Panel conversation on building with conviction"],
  ["5.jpeg", "Leaders and guests at KES 3.0"],
  ["6.jpeg", "Questions and insight from the floor"],
  ["7.jpeg", "A keynote on stewardship and scale"],
  ["8.jpeg", "Connections made between sessions"],
  ["9.jpeg", "Prayer over businesses and builders"],
  ["10.jpeg", "A room aligned around the mandate"],
  ["11.jpeg", "A room aligned around the mandate"],
  ["12.jpeg", "A room aligned around the mandate"],
  ["13.jpeg", "A room aligned around the mandate"],
  ["14.jpeg", "A room aligned around the mandate"],
  ["15.jpeg", "A room aligned around the mandate"],
  ["16.jpeg", "A room aligned around the mandate"],
  ["17.jpeg", "A room aligned around the mandate"],
  ["18.jpeg", "A room aligned around the mandate"],
  ["19.jpeg", "A room aligned around the mandate"],
  ["20.jpeg", "A room aligned around the mandate"],
  ["21.jpeg", "A room aligned around the mandate"],
  ["22.jpeg", "A room aligned around the mandate"],
] as const;

export type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
  kind: "flyer" | "moment";
};

export type PastEdition = {
  year: string;
  edition: string;
  theme: string;
  location: string;
  accent: string;
  gallery: readonly GalleryItem[];
};

export const PAST_EDITIONS: readonly PastEdition[] = [
  {
    year: "2020",
    edition: "KES 1.0",
    theme: "Maiden Edition",
    location: "2020",
    accent: "navy",
    gallery: [
      {
        src: asset("/editions/kes-2020-official-flyer.jpg"),
        alt: "KES 1.0 Maiden Edition official flyer",
        caption: "The official flyer for the maiden KES gathering.",
        kind: "flyer",
      },
      {
        src: asset("/editions/kes-2020-1.JPG"),
        alt: "Guests at the maiden KES gathering",
        caption: "Moments from the maiden KES gathering",
        kind: "moment",
      },
      {
        src: asset("/editions/kes-2020-2.JPG"),
        alt: "A session at KES 1.0",
        caption: "The maiden gathering in session",
        kind: "moment",
      },
      {
        src: asset("/editions/kes-2020-3.JPG"),
        alt: "A speaker addressing KES 1.0 attendees",
        caption: "Marketplace teaching at KES 1.0",
        kind: "moment",
      },
      {
        src: asset("/editions/kes-2020-4.JPG"),
        alt: "KES 1.0 attendees during the event",
        caption: "Builders gathered for the maiden edition",
        kind: "moment",
      },
      {
        src: asset("/editions/kes-2020-5.JPG"),
        alt: "A moment captured at KES 1.0",
        caption: "The KES journey begins",
        kind: "moment",
      },
    ],
  },
  {
    year: "2023",
    edition: "KES 2.0",
    theme: "Empowered for Wealth",
    location: "Ibadan · 2023",
    accent: "gold",
    gallery: [
      {
        src: asset("/editions/kes-2023-official-flyer.jpg"),
        alt: "KES 2.0 Empowered for Wealth official flyer",
        caption: "The official flyer for KES 2.0",
        kind: "flyer",
      },
    ],
  },
  {
    year: "2025",
    edition: "KES 3.0",
    theme: "Upsurge",
    location: "Ibadan · 2025",
    accent: "rose",
    gallery: [
      {
        src: asset("/editions/kes-2025-official-flyer.jpg"),
        alt: "KES 3.0 Upsurge official flyer",
        caption: "The official flyer for KES 3.0",
        kind: "flyer",
      },

      ...KES_2025_MOMENTS.map(([filename, caption]) => ({
        src: asset(`/pastEvents/${filename}`),
        alt: caption,
        caption,
        kind: "moment" as const,
      })),
    ],
  },
];
