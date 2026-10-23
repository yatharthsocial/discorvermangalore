import type { StaticImageData } from "next/image";
import nudisiriPosterImg from "@/assets/culture/alvas-nudisiri-virasat-2027.jpg";
import bhutaKolaImg from "@/assets/culture/bhuta-kola.jpg";
import kambalaImg from "@/assets/culture/kambala.jpg";
import dasaraImg from "@/assets/culture/mangaluru-dasara.jpg";
import christmasMilagresImg from "@/assets/culture/christmas-milagres.jpg";
import montiFestImg from "@/assets/culture/monti-fest.jpg";
import piliVeshaImg from "@/assets/culture/pili-vesha.jpg";
import yakshaganaImg from "@/assets/culture/yakshagana.jpg";

// Content for the /culture page. To add or replace a photo: put it in src/assets/culture/, import it here and
// set `image`.

export const kinds = [
  { id: "performing", label: "Performing arts" },
  { id: "ritual", label: "Rituals" },
  { id: "festival", label: "Festivals" },
  { id: "sport", label: "Folk sport" },
] as const;

export type KindId = (typeof kinds)[number]["id"];

export type Tradition = {
  id: string;
  name: string;
  kind: KindId;
  // When you can see it, e.g. "November to May".
  season: string;
  teaser: string;
  story: string;
  experience: string[];
  tip: string;
  image?: StaticImageData;
  imageAlt?: string;
  imagePosition?: string;
};

// Shown first, as the page's featured event.
export const virasat = {
  name: "Alva's Nudisiri 2027",
  // Full name as printed on the official poster.
  fullName: "Alva's Nudisiri Virasat 2027",
  organiser: "Alva's Education Foundation",
  place: "Vidyagiri campus, Moodbidri",
  season: "6 to 10 January 2027",
  startDate: "2027-01-06",
  endDate: "2027-01-10",
  theme: "Kannada Manasu, Bhavishyada Kanasu",
  summary:
    "Alva's Nudisiri Virasat 2027 brings together Alva's Nudisiri, the celebrated festival of Kannada language and literature, and Alva's Virasat, its festival of music, dance and the arts. It is organised by Alva's Education Foundation at its campus in Moodbidri, near Mangaluru, from 6 to 10 January 2027.",
  highlights: [
    "Five days of Kannada literature, talks and conversations",
    "Music, dance and folk performances, including Yakshagana",
    "This year's theme: Kannada Manasu, Bhavishyada Kanasu",
    "Organised by Alva's Education Foundation in Moodbidri",
  ],
  website: "https://www.aiet.org.in/celebrations/alvas-nudisiri/",
  image: nudisiriPosterImg,
  imageAlt:
    "Official poster for Alva's Nudisiri Virasat, 6 to 10 January 2027, with a Yakshagana figure and the Alva's Education Foundation logo",
};

export const traditions: Tradition[] = [
  {
    id: "yakshagana",
    name: "Yakshagana",
    kind: "performing",
    season: "November to May",
    teaser: "All-night theatre of dance, drums and dazzling crowns.",
    story:
      "Yakshagana is the traditional theatre of coastal Karnataka, combining dance, music, improvised dialogue and spectacular costumes and make-up. Troupes perform stories from the Ramayana, Mahabharata and the Puranas, often through the night, to the beat of the chende drum.",
    experience: [
      "Towering headdresses and painted faces",
      "The chende drum and the singer (bhagavata) who leads the story",
      "Performances that run late into the night",
    ],
    tip: "Many shows are held in temple grounds in season. Ask locally or check temple notice boards for dates.",
    image: yakshaganaImg,
    imageAlt:
      "Yakshagana artist in a towering golden headdress and painted face",
    imagePosition: "50% 25%",
  },
  {
    id: "bhuta-kola",
    name: "Bhuta Kola",
    kind: "ritual",
    season: "Mainly December to May",
    teaser: "A sacred night ritual honouring the spirits of Tulunadu.",
    story:
      "Bhuta Kola, also called Daiva Kola, is a sacred ritual of Tulunadu in which a performer embodies a guardian spirit (daiva), wearing elaborate make-up, ornaments and a costume of tender coconut fronds. Through dance and spoken word, the daiva blesses the community and settles disputes. The ritual became widely known after the 2022 film Kantara.",
    experience: [
      "Painted faces and costumes of coconut fronds",
      "Drums, pipes and torchlight through the night",
      "A living tradition of faith, not a show",
    ],
    tip: "Bhuta Kola is a religious ritual. Attend only if invited or welcomed, stay quiet and respectful, and ask before taking photos.",
    image: bhutaKolaImg,
    imageAlt:
      "Bhuta Kola performer in a painted mask, flower garlands and a costume of coconut fronds",
    imagePosition: "50% 20%",
  },
  {
    id: "kambala",
    name: "Kambala",
    kind: "sport",
    season: "November to March",
    teaser: "Buffalo racing through flooded paddy fields.",
    story:
      "Kambala is the traditional buffalo race of Dakshina Kannada and Udupi. Pairs of buffaloes, driven by a runner, sprint down long tracks of slushy paddy fields, sending up great sprays of water. Races are big village events with crowds, music and food.",
    experience: [
      "Buffaloes racing at full speed through water",
      "Packed crowds along the tracks",
      "A village festival atmosphere",
    ],
    tip: "Races happen on weekends in season and dates change every year. Ask locally for the next Kambala near you.",
    image: kambalaImg,
    imageAlt:
      "Runner driving a pair of buffaloes through water at a Kambala race",
    imagePosition: "50% 12%",
  },
  {
    id: "mangaluru-dasara",
    name: "Mangaluru Dasara",
    kind: "festival",
    season: "September or October (Navaratri)",
    teaser: "The city lit up for ten nights, centred on Kudroli.",
    story:
      "During Navaratri, Mangaluru celebrates Dasara on a grand scale, centred on the Kudroli Gokarnanatha Temple. Beautifully decorated idols of the Navadurgas and Sharada are installed, the city's streets glow with lights, and the festival ends with a long procession through the city.",
    experience: [
      "Decorated idols at Kudroli Gokarnanatha Temple",
      "Streets lit up across the city",
      "The grand closing procession",
    ],
    tip: "Evenings are the best time to see the lights. Expect large crowds near Kudroli.",
    image: dasaraImg,
    imageAlt: "Decorated idol of the goddess during Mangaluru Dasara",
    imagePosition: "50% 8%",
  },
  {
    id: "pili-vesha",
    image: piliVeshaImg,
    imageAlt:
      "Pili Vesha tiger dancers in painted spots and white wigs performing on stage",
    imagePosition: "50% 15%",
    name: "Pili Vesha",
    kind: "performing",
    season: "Dasara and Krishna Janmashtami",
    teaser: "Tiger dancers painted in stripes, dancing to drums.",
    story:
      "Pili Vesha, the tiger dance, is one of Tulunadu's most joyful folk traditions. Troupes of dancers paint their bodies with tiger stripes and dance through the streets to the beat of drums, especially during Dasara and Krishna Janmashtami.",
    experience: [
      "Dancers painted head to toe as tigers",
      "Thundering drum beats",
      "Street performances during festivals",
    ],
    tip: "Look out for troupes on the streets during Dasara. Tipping the dancers is customary.",
  },
  {
    id: "christmas-milagres",
    image: christmasMilagresImg,
    imageAlt:
      "Milagres Church lit up at night for Christmas, with a crowd gathered in front and a glowing star",
    imagePosition: "50% 62%",
    name: "Christmas at Milagres",
    kind: "festival",
    season: "December",
    teaser: "Midnight mass, carols and cribs in the old town.",
    story:
      "Mangaluru has a large Catholic community, and Christmas is celebrated with great warmth. Milagres Church in Hampankatta, one of the city's oldest churches, is at the heart of the celebrations, with midnight mass, carols and cribs. Homes prepare kuswar, the traditional platter of Mangalorean Christmas sweets.",
    experience: [
      "Midnight mass on Christmas Eve",
      "Carols, stars and cribs across the city",
      "Kuswar, the Mangalorean Christmas sweets",
    ],
    tip: "Midnight mass is very popular. Arrive early to find a place, and dress modestly.",
  },
  {
    id: "monti-fest",
    image: montiFestImg,
    imageAlt:
      "Statue of the infant Mary on a bed of flowers with new paddy stalks offered at Monti Fest",
    imagePosition: "50% 62%",
    name: "Monti Fest",
    kind: "festival",
    season: "8 September",
    teaser: "The Mangalorean Catholic harvest feast.",
    story:
      "Monti Fest marks the feast of the Nativity of Mary and is also a harvest festival for Mangalorean Catholics. Children offer flowers, new grain is blessed, and families share a vegetarian feast made with the new harvest.",
    experience: [
      "Flower offerings by children",
      "Blessing of the new harvest",
      "A vegetarian family feast",
    ],
    tip: "Churches across the city hold special masses that morning.",
  },
];

export const faqs: { question: string; answer: string }[] = [
  {
    question: "When is Alva's Nudisiri 2027?",
    answer:
      "Alva's Nudisiri Virasat 2027 takes place from 6 to 10 January 2027 at the Vidyagiri campus of Alva's Education Foundation in Moodbidri, near Mangaluru. It combines Alva's Nudisiri, a festival of Kannada literature, with Alva's Virasat, a festival of music, dance and the arts.",
  },
  {
    question: "What is Yakshagana?",
    answer:
      "Yakshagana is the traditional theatre of coastal Karnataka, combining dance, music, dialogue and elaborate costumes to tell stories from the epics, often performed through the night between November and May.",
  },
  {
    question: "What is Bhuta Kola?",
    answer:
      "Bhuta Kola, or Daiva Kola, is a sacred ritual of Tulunadu in which a performer embodies a guardian spirit to bless the community. It is a religious ceremony and should be attended respectfully.",
  },
  {
    question: "When is Kambala held?",
    answer:
      "Kambala buffalo races are held in Dakshina Kannada and Udupi between November and March, usually on weekends. Dates change every year.",
  },
];
