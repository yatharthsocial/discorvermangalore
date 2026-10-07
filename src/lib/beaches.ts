import type { StaticImageData } from "next/image";
import bengreImg from "@/assets/beaches/bengre.jpg";
import panamburImg from "@/assets/beaches/panambur.jpg";
import sasihithluImg from "@/assets/beaches/sasihithlu.jpg";
import someshwaraImg from "@/assets/beaches/someshwara.jpg";
import surathkalImg from "@/assets/beaches/surathkal.jpg";
import tannirbhaviImg from "@/assets/beaches/tannirbhavi.jpg";
import ullalImg from "@/assets/beaches/ullal.jpg";

// Content for the /beaches page, ordered north to south along the coast.
// To use a real photo for a beach: add it under src/assets/beaches/, import it here and set `image`.

export const goodFor = [
  "Water sports",
  "Surfing",
  "Quiet",
  "Family",
  "Sunset walks",
  "Ferry ride",
  "Landmarks",
] as const;

export type GoodFor = (typeof goodFor)[number];

export type Scene =
  "port" | "lighthouse" | "rocks" | "palms" | "boats" | "surf" | "temple";

export type Beach = {
  id: string;
  name: string;
  area: string;
  tagline: string;
  description: string;
  goodFor: GoodFor[];
  tip: string;
  // Which illustration to draw, and the scene's sky/sea colours.
  scene: Scene;
  sky: [string, string];
  sea: string;
  // Pin position on the 200 x 520 coastline map.
  y: number;
  image?: StaticImageData;
  imageAlt?: string;
};

export const beaches: Beach[] = [
  {
    id: "sasihithlu",
    image: sasihithluImg,
    imageAlt:
      "Sunset over the sea seen from the breakwater at Sasihithlu Beach",
    name: "Sasihithlu Beach",
    area: "Near Mukka, north Mangaluru",
    tagline: "Where the rivers meet the sea",
    description:
      "A long, open beach where the Shambhavi and Nandini rivers meet the Arabian Sea. Its steady waves have made it one of India's best-known surfing spots, and it has hosted national surfing events.",
    goodFor: ["Surfing", "Quiet", "Sunset walks"],
    tip: "Surf schools here offer beginner lessons in season. Go early in the morning for the calmest water.",
    scene: "surf",
    sky: ["#f9c784", "#fde8c8"],
    sea: "#2f8fae",
    y: 50,
  },
  {
    id: "surathkal",
    image: surathkalImg,
    imageAlt:
      "Aerial view of the red and white Surathkal lighthouse above the rocks and beach",
    name: "Surathkal Beach",
    area: "Surathkal",
    tagline: "The lighthouse on the rocks",
    description:
      "A rocky stretch of coast crowned by the Surathkal lighthouse, close to the NITK campus. Climb the rocks for wide views over the sea, especially as the sun goes down.",
    goodFor: ["Landmarks", "Sunset walks", "Quiet"],
    tip: "The rocks get slippery near the water, so wear shoes with grip.",
    scene: "lighthouse",
    sky: ["#f7a072", "#fcd5b5"],
    sea: "#2b7fa3",
    y: 120,
  },
  {
    id: "panambur",
    image: panamburImg,
    imageAlt:
      "Panambur Beach with its lifeguard tower, golden sand and waves under a cloudy blue sky",
    name: "Panambur Beach",
    area: "Panambur, next to New Mangalore Port",
    tagline: "The city's favourite beach",
    description:
      "Mangaluru's busiest and best-loved beach, right beside New Mangalore Port. Wide sands, ships on the horizon, food stalls and a lively evening crowd make it the place most locals take visitors first.",
    goodFor: ["Water sports", "Family", "Sunset walks"],
    tip: "Weekend evenings get crowded. For a calmer visit, come on a weekday or early morning.",
    scene: "port",
    sky: ["#ff9a76", "#ffd6a5"],
    sea: "#24799e",
    y: 200,
  },
  {
    id: "tannirbhavi",
    image: tannirbhaviImg,
    imageAlt:
      "Thatched beach umbrella and wooden loungers on the sand at Tannirbhavi Beach",
    name: "Tannirbhavi Beach",
    area: "Across the Gurupura river",
    tagline: "Clean sands, shaded by casuarinas",
    description:
      "A cleaner, quieter beach on a strip of land across the Gurupura river, lined with casuarina trees. Reach it by road or take the short ferry from Sultan Battery for a more scenic arrival.",
    goodFor: ["Quiet", "Family", "Ferry ride"],
    tip: "Pair it with the Tannirbhavi tree park nearby for an easy half-day out.",
    scene: "palms",
    sky: ["#ffb88c", "#ffe3c4"],
    sea: "#2a86a8",
    y: 262,
  },
  {
    id: "bengre",
    image: bengreImg,
    imageAlt:
      "Aerial view of the palm-covered tip of the Bengre sand spit with waves around it",
    name: "Bengre Beach",
    area: "Bengre sand spit",
    tagline: "Fishing boats and village life",
    description:
      "A narrow sand spit between the river and the sea, home to a fishing community. Colourful boats, nets drying in the sun and a slower pace give it a side of Mangaluru most visitors miss.",
    goodFor: ["Ferry ride", "Quiet"],
    tip: "Ferries cross from the old port side of the city. Be respectful when photographing people at work.",
    scene: "boats",
    sky: ["#fcb69f", "#ffecd2"],
    sea: "#2c7c9c",
    y: 312,
  },
  {
    id: "ullal",
    image: ullalImg,
    imageAlt: "Waves crashing on the concrete breakwater blocks at Ullal Beach",
    name: "Ullal Beach",
    area: "Ullal, south Mangaluru",
    tagline: "Resorts near the Netravati",
    description:
      "A long beach south of the city, near where the Netravati river reaches the sea, with resorts along the shore. Nearby, the historic Ullal Dargah draws visitors from across the region.",
    goodFor: ["Family", "Sunset walks", "Landmarks"],
    tip: "Currents can be strong here. Stay in shallow water and follow lifeguards' flags.",
    scene: "temple",
    sky: ["#f8a488", "#fde2c8"],
    sea: "#277b9f",
    y: 392,
  },
  {
    id: "someshwara",
    image: someshwaraImg,
    imageAlt:
      "Sunset over the sea at Someshwara Beach, with rocks offshore, steps down to the sand and green hillside",
    name: "Someshwara Beach",
    area: "Someshwara, Ullal",
    tagline: "Rocks, waves and an old temple",
    description:
      "Dramatic black rocks known as Rudra Shile meet crashing waves, with the Someshwara temple close to the shore. It is one of the most photographed spots on the coast.",
    goodFor: ["Landmarks", "Sunset walks"],
    tip: "Swimming is not safe here because of the rocks and currents. Enjoy it from the shore.",
    scene: "rocks",
    sky: ["#f6a07a", "#fbd3b6"],
    sea: "#23739a",
    y: 455,
  },
];

export const faqs: { question: string; answer: string }[] = [
  {
    question: "Which is the most popular beach in Mangaluru?",
    answer:
      "Panambur Beach, next to New Mangalore Port, is the busiest and most popular beach in Mangaluru, known for its wide sands, evening crowds and water sports in season.",
  },
  {
    question: "What is the best time to visit Mangaluru's beaches?",
    answer:
      "October to February is the most comfortable time, with calm seas and pleasant weather. During the monsoon, from June to September, the sea is rough and swimming is not safe.",
  },
  {
    question: "Where can you surf in Mangaluru?",
    answer:
      "Sasihithlu Beach, north of the city where the Shambhavi and Nandini rivers meet the sea, is the best-known surfing spot near Mangaluru, with surf schools offering lessons in season.",
  },
  {
    question: "Is it safe to swim at Someshwara Beach?",
    answer:
      "No. Someshwara Beach has large rocks and strong currents, so it is best enjoyed from the shore.",
  },
];
