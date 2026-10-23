import type { StaticImageData } from "next/image";
import kadriImg from "@/assets/about/kadri-temple-mangaluru.jpeg";
import kateelImg from "@/assets/temples/kateel-durgaparameshwari.jpg";
import mangaladeviImg from "@/assets/temples/mangaladevi.jpg";
import milagresImg from "@/assets/temples/milagres-church.jpg";
import polaliImg from "@/assets/temples/polali-rajarajeshwari.jpg";
import rosarioImg from "@/assets/temples/rosario-cathedral.jpg";
import basadiImg from "@/assets/temples/saavira-kambada-basadi.jpg";
import sharavuImg from "@/assets/temples/sharavu-mahaganapathi.jpg";
import aloysiusImg from "@/assets/temples/st-aloysius-chapel.jpg";
import sultanImg from "@/assets/temples/sultan-battery.jpg";
import ullalDargahImg from "@/assets/temples/ullal-dargah.jpg";
import zeenathImg from "@/assets/temples/zeenath-baksh-masjid.jpg";

// Content for the /temples page. To use a photo for a place: add it under src/assets/temples/, import it here
// and set `image`.

export const kinds = [
  { id: "temple", label: "Temples" },
  { id: "church", label: "Churches" },
  { id: "mosque", label: "Mosques & Dargahs" },
  { id: "jain", label: "Jain Basadis" },
  { id: "heritage", label: "Heritage" },
] as const;

export type KindId = (typeof kinds)[number]["id"];

export type Place = {
  id: string;
  name: string;
  kind: KindId;
  area: string;
  // Short "age" line, e.g. "10th century".
  era: string;
  teaser: string;
  story: string;
  see: string[];
  tip: string;
  image?: StaticImageData;
  imageAlt?: string;
  // Which part of the photo stays in view when it is trimmed to the card (CSS object-position).
  imagePosition?: string;
};

export const places: Place[] = [
  {
    id: "kadri-manjunatha",
    name: "Kadri Manjunatha Temple",
    kind: "temple",
    area: "Kadri",
    era: "Around 1,000 years old",
    teaser: "Ancient hillside temple famous for its bronze statues.",
    story:
      "One of the oldest temples in Mangaluru, set at the foot of Kadri hill. It is known for its ancient bronze statues, including a celebrated image of Lokeshwara, and for the sacred water tanks fed by natural springs above the temple.",
    see: [
      "Ancient bronze statues",
      "Spring-fed water tanks",
      "Caves on the hill above",
    ],
    tip: "Combine your visit with Kadri Park, a short walk away.",
    image: kadriImg,
    imageAlt:
      "Blue temple gopuram with golden deity sculptures at Kadri, Mangaluru",
  },
  {
    id: "mangaladevi",
    image: mangaladeviImg,
    imageAlt: "Entrance of the Mangaladevi Temple in Bolar, Mangaluru",
    imagePosition: "50% 50%",
    name: "Mangaladevi Temple",
    kind: "temple",
    area: "Bolar",
    era: "Ancient",
    teaser: "The goddess who gave Mangaluru its name.",
    story:
      "The city of Mangaluru takes its name from Mangaladevi, the goddess worshipped at this temple in Bolar. It is especially busy during Navaratri, when devotees come from across the region.",
    see: ["The main shrine of Mangaladevi", "Navaratri celebrations"],
    tip: "Visit early in the morning on festival days to avoid the longest queues.",
  },
  {
    id: "sharavu-mahaganapathi",
    image: sharavuImg,
    imageAlt: "Carved and painted facade of Sharavu Mahaganapathi Temple",
    imagePosition: "50% 40%",
    name: "Sharavu Mahaganapathi Temple",
    kind: "temple",
    area: "City centre",
    era: "Centuries old",
    teaser: "A much-loved Ganapathi temple in the heart of the city.",
    story:
      "Right in the city centre, Sharavu Mahaganapathi Temple is one of Mangaluru's best-known temples, dedicated to Lord Ganapathi and visited by locals throughout the day.",
    see: ["The Mahaganapathi shrine", "Daily poojas"],
    tip: "It is close to Hampankatta, so it fits easily into a walk around the old city.",
  },
  {
    id: "polali-rajarajeshwari",
    image: polaliImg,
    imageAlt:
      "Aerial view of the Polali Rajarajeshwari Temple courtyard and tiled roofs",
    imagePosition: "50% 50%",
    name: "Polali Rajarajeshwari Temple",
    kind: "temple",
    area: "Polali, near Kaikamba",
    era: "Ancient",
    teaser: "Known for its large clay image of the goddess.",
    story:
      "A historic temple dedicated to Goddess Rajarajeshwari, known for its large idol made of clay. The temple's annual festival draws large crowds from across Dakshina Kannada.",
    see: ["The clay image of the goddess", "The annual temple festival"],
    tip: "It is a short drive from the city, best combined with a trip towards Kateel.",
  },
  {
    id: "kateel-durgaparameshwari",
    image: kateelImg,
    imageAlt:
      "Colourful gopurams at the entrance of Kateel Durgaparameshwari Temple",
    imagePosition: "50% 45%",
    name: "Kateel Durgaparameshwari Temple",
    kind: "temple",
    area: "Kateel",
    era: "Ancient",
    teaser: "A temple on an islet in the Nandini river.",
    story:
      "Set on a small islet in the middle of the Nandini river, this temple to Goddess Durgaparameshwari is one of the most visited in the region. It is also closely linked with Yakshagana, the traditional dance-drama of coastal Karnataka.",
    see: ["The riverside setting", "Yakshagana performances"],
    tip: "Ask locally about Yakshagana shows, which are often held through the night in season.",
  },
  {
    id: "st-aloysius-chapel",
    image: aloysiusImg,
    imageAlt: "Painted walls and ceiling inside St Aloysius Chapel",
    imagePosition: "50% 40%",
    name: "St Aloysius Chapel",
    kind: "church",
    area: "Lighthouse Hill",
    era: "Painted in 1899",
    teaser: "Every wall and ceiling covered in paintings.",
    story:
      "Inside the St Aloysius College campus, this chapel is famous for its paintings by the Italian Jesuit artist Antonio Moscheni, which cover almost every surface of its walls and ceiling.",
    see: [
      "Moscheni's painted walls and ceiling",
      "The college campus on Lighthouse Hill",
    ],
    tip: "Photography may be restricted inside, so check at the entrance first.",
  },
  {
    id: "milagres-church",
    image: milagresImg,
    imageAlt: "White facade of Milagres Church in Hampankatta, Mangaluru",
    imagePosition: "50% 35%",
    name: "Milagres Church",
    kind: "church",
    area: "Hampankatta",
    era: "Founded in 1680",
    teaser: "One of the city's oldest churches, in the old town.",
    story:
      "Milagres Church in Hampankatta is one of the oldest churches in Mangaluru, at the heart of the city's Catholic community and its old commercial centre.",
    see: ["The church and its grounds", "The surrounding old-town streets"],
    tip: "Hampankatta is busy on weekdays; Sunday mornings are calmer outside of mass times.",
  },
  {
    id: "rosario-cathedral",
    image: rosarioImg,
    imageAlt: "Rosario Cathedral with its dome, in Bolar",
    imagePosition: "50% 40%",
    name: "Rosario Cathedral",
    kind: "church",
    area: "Bolar",
    era: "16th century origins",
    teaser: "A historic cathedral with a striking dome.",
    story:
      "Rosario Cathedral, near the old port, is among the earliest churches on this coast. Its present building, with a dome inspired by St Peter's in Rome, is a landmark of the Bolar area.",
    see: ["The domed cathedral", "The old port area nearby"],
    tip: "Pair it with a visit to Mangaladevi Temple, also in Bolar.",
  },
  {
    id: "zeenath-baksh-masjid",
    image: zeenathImg,
    imageAlt: "Arched verandah of Zeenath Baksh Juma Masjid in Bunder",
    imagePosition: "50% 50%",
    name: "Zeenath Baksh Juma Masjid",
    kind: "mosque",
    area: "Bunder",
    era: "Believed to date to the 7th century",
    teaser: "Believed to be one of the oldest mosques in India.",
    story:
      "Near the old port at Bunder, this mosque is traditionally believed to have been founded by Arab traders in the 7th century, which would make it one of the oldest mosques in India. It is known for its fine wooden interiors.",
    see: ["Carved wooden interiors", "The old port neighbourhood"],
    tip: "Dress modestly. Visitors should check entry and timings locally, as prayer times take priority.",
  },
  {
    id: "ullal-dargah",
    image: ullalDargahImg,
    imageAlt:
      "Ornate white, blue and gold entrance arch of Ullal Juma Masjid and Dargah, with the mosque behind",
    imagePosition: "50% 40%",
    name: "Ullal Dargah",
    kind: "mosque",
    area: "Ullal",
    era: "16th century",
    teaser: "A revered shrine by the sea.",
    story:
      "The dargah of Syed Mohammed Shareeful Madani in Ullal is one of the most important shrines on the coast, visited by people of many faiths. Its Uroos festival draws large crowds.",
    see: ["The dargah", "Ullal Beach nearby"],
    tip: "Cover your head and dress modestly when entering.",
  },
  {
    id: "saavira-kambada-basadi",
    image: basadiImg,
    imageAlt:
      "Saavira Kambada Basadi in Moodbidri, seen from above with its walled compound",
    imagePosition: "50% 50%",
    name: "Saavira Kambada Basadi",
    kind: "jain",
    area: "Moodbidri",
    era: "15th century",
    teaser: "The Jain temple of a thousand pillars.",
    story:
      "In Moodbidri, the 'thousand-pillared' basadi is the most famous of the town's many Jain temples, admired for its richly carved stone pillars, no two of which are said to be alike.",
    see: ["The carved stone pillars", "Other basadis around Moodbidri"],
    tip: "Moodbidri is about an hour from Mangaluru, so plan a half-day trip.",
  },
  {
    id: "sultan-battery",
    image: sultanImg,
    imageAlt: "Black-stone watchtower of Sultan Battery in Boloor",
    imagePosition: "50% 55%",
    name: "Sultan Battery",
    kind: "heritage",
    area: "Boloor",
    era: "18th century",
    teaser: "Tipu Sultan's black-stone watchtower.",
    story:
      "Built by Tipu Sultan, this black-stone watchtower by the Gurupura river once guarded the approach to the city from the sea. Today it is a small, atmospheric heritage spot.",
    see: ["The watchtower and its views", "The ferry to Tannirbhavi beach"],
    tip: "Take the ferry across to Tannirbhavi beach from here.",
  },
];

export const faqs: { question: string; answer: string }[] = [
  {
    question: "Why is the city called Mangaluru?",
    answer:
      "Mangaluru takes its name from Mangaladevi, the goddess worshipped at the Mangaladevi Temple in Bolar.",
  },
  {
    question: "Which is the oldest temple in Mangaluru?",
    answer:
      "Kadri Manjunatha Temple is one of the oldest temples in Mangaluru, known for its ancient bronze statues and spring-fed tanks.",
  },
  {
    question: "What is special about St Aloysius Chapel?",
    answer:
      "Its walls and ceiling are covered in paintings by the Italian Jesuit artist Antonio Moscheni, completed around 1899.",
  },
  {
    question: "What should I wear when visiting temples in Mangaluru?",
    answer:
      "Dress modestly, covering shoulders and knees. Remove footwear before entering temples, and follow any local rules on dress or photography.",
  },
];
