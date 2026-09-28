import type { StaticImageData } from "next/image";
import alvasCollegeImg from "@/assets/about/alvas-pu-college-moodbidri.jpg";

// Content for the /education directory.
// Ordering: an institution "pinned" to a filter is shown first in that filter, in the order listed here.
// Alva's Education Foundation leads "All"; Rajeshwari National School leads "Schools".

export const categories = [
  { id: "school", label: "Schools" },
  { id: "medical", label: "Medical" },
  { id: "engineering", label: "Engineering" },
  { id: "mba", label: "MBA" },
  { id: "hotel", label: "Hotel Management" },
  { id: "media", label: "Mass Media" },
] as const;

export type CategoryId = (typeof categories)[number]["id"];
export type Filter = CategoryId | "all";

export type Institution = {
  id: string;
  name: string;
  area: string;
  categories: CategoryId[];
  // Filters where this institution is shown first.
  pinned?: Filter[];
  // Featured institutions get the large card with summary, photo and website button.
  featured?: boolean;
  summary?: string;
  highlights?: string[];
  // Official website. A normal (followed) link, so the page passes on search visibility.
  website?: string;
  image?: StaticImageData;
  imageAlt?: string;
  imagePosition?: string;
  // Part of the Alva's group (gets a small badge).
  alvas?: boolean;
};

export const institutions: Institution[] = [
  // Focus institutions
  {
    id: "alvas-education-foundation",
    name: "Alva's Education Foundation",
    area: "Moodbidri",
    categories: [],
    pinned: ["all"],
    featured: true,
    alvas: true,
    summary:
      "Founded by Dr. M. Mohan Alva, Alva's Education Foundation runs a large campus in Moodbidri, about 35 km from Mangaluru, with institutions from school level right up to professional colleges. It is known across Karnataka for combining academics with sport, arts and culture.",
    highlights: [
      "School, pre-university, degree and professional colleges on one campus",
      "Engineering and health sciences, including ayurveda",
      "Strong focus on sports and cultural training alongside academics",
      "Home of Alva's Virasat and Alva's Nudisiri cultural festivals",
    ],
    website: "https://alvas.org",
    image: alvasCollegeImg,
    imageAlt:
      "Alva's Pre-University College building in Moodbidri with a Yakshagana figure statue at the entrance",
    imagePosition: "50% 30%",
  },
  {
    id: "rajeshwari-national-school",
    name: "Rajeshwari National School",
    area: "Sanoor",
    categories: ["school"],
    pinned: ["all", "school"],
    featured: true,
    summary:
      "Rajeshwari National School in Sanoor. Full details about the school, including its curriculum, facilities and admissions, are being added.",
  },

  // Alva's institutions
  {
    id: "alvas-institute-of-engineering-and-technology",
    name: "Alva's Institute of Engineering & Technology",
    area: "Moodbidri",
    categories: ["engineering", "mba"],
    pinned: ["engineering", "mba"],
    alvas: true,
  },
  {
    id: "alvas-ayurveda-medical-college",
    name: "Alva's Ayurveda Medical College",
    area: "Moodbidri",
    categories: ["medical"],
    pinned: ["medical"],
    alvas: true,
  },

  // Schools
  {
    id: "canara-high-school",
    name: "Canara High School",
    area: "Mangaluru",
    categories: ["school"],
  },
  {
    id: "lourdes-central-school",
    name: "Lourdes Central School",
    area: "Bejai",
    categories: ["school"],
  },
  {
    id: "st-aloysius-gonzaga-school",
    name: "St Aloysius Gonzaga School",
    area: "Mangaluru",
    categories: ["school"],
  },
  {
    id: "kendriya-vidyalaya-panambur",
    name: "Kendriya Vidyalaya Panambur",
    area: "Panambur",
    categories: ["school"],
  },

  // Medical
  {
    id: "kasturba-medical-college",
    name: "Kasturba Medical College",
    area: "Mangaluru",
    categories: ["medical"],
  },
  {
    id: "father-muller-medical-college",
    name: "Father Muller Medical College",
    area: "Kankanady",
    categories: ["medical"],
  },
  {
    id: "yenepoya-medical-college",
    name: "Yenepoya Medical College",
    area: "Deralakatte",
    categories: ["medical"],
  },
  {
    id: "ks-hegde-medical-academy",
    name: "K S Hegde Medical Academy (NITTE)",
    area: "Deralakatte",
    categories: ["medical"],
  },
  {
    id: "aj-institute-of-medical-sciences",
    name: "A J Institute of Medical Sciences",
    area: "Kuntikana",
    categories: ["medical"],
  },
  {
    id: "srinivas-institute-of-medical-sciences",
    name: "Srinivas Institute of Medical Sciences",
    area: "Mukka",
    categories: ["medical"],
  },

  // Engineering
  {
    id: "nitk-surathkal",
    name: "NITK Surathkal",
    area: "Surathkal",
    categories: ["engineering"],
  },
  {
    id: "sahyadri-college",
    name: "Sahyadri College of Engineering & Management",
    area: "Adyar",
    categories: ["engineering", "mba"],
  },
  {
    id: "st-joseph-engineering-college",
    name: "St Joseph Engineering College",
    area: "Vamanjoor",
    categories: ["engineering"],
  },
  {
    id: "canara-engineering-college",
    name: "Canara Engineering College",
    area: "Benjanapadavu",
    categories: ["engineering"],
  },
  {
    id: "pa-college-of-engineering",
    name: "P A College of Engineering",
    area: "Konaje",
    categories: ["engineering"],
  },
  {
    id: "srinivas-institute-of-technology",
    name: "Srinivas Institute of Technology",
    area: "Valachil",
    categories: ["engineering"],
  },

  // MBA
  {
    id: "aimit",
    name: "St Aloysius Institute of Management & IT (AIMIT)",
    area: "Kotekar",
    categories: ["mba"],
  },
  {
    id: "mangalore-university-business-administration",
    name: "Mangalore University, Dept. of Business Administration",
    area: "Konaje",
    categories: ["mba"],
  },

  // Hotel management
  {
    id: "srinivas-college-of-hotel-management",
    name: "Srinivas College of Hotel Management",
    area: "Pandeshwar",
    categories: ["hotel"],
  },
  {
    id: "aj-institute-of-hotel-management",
    name: "A J Institute of Hotel Management",
    area: "Kuntikana",
    categories: ["hotel"],
  },

  // Mass media
  {
    id: "st-aloysius-college-journalism",
    name: "St Aloysius College, Journalism",
    area: "Mangaluru",
    categories: ["media"],
  },
  {
    id: "mangalore-university-mass-communication",
    name: "Mangalore University, Mass Communication & Journalism",
    area: "Konaje",
    categories: ["media"],
  },
  {
    id: "sdm-college-ujire",
    name: "SDM College, Journalism",
    area: "Ujire",
    categories: ["media"],
  },
];

/** Institutions shown for a filter: pinned ones first (in list order), then the rest (in list order). */
export function forFilter(filter: Filter): Institution[] {
  const matches = institutions.filter(
    (i) => filter === "all" || i.categories.includes(filter),
  );
  const pinned = matches.filter((i) => i.pinned?.includes(filter));
  const rest = matches.filter((i) => !i.pinned?.includes(filter));
  return [...pinned, ...rest];
}

export const faqs: { question: string; answer: string }[] = [
  {
    question: "Why is Mangaluru known as an education hub?",
    answer:
      "Mangaluru and the surrounding Dakshina Kannada district offer everything from school education to engineering, medicine, management, hotel management and journalism. Students come from across India and abroad to study here.",
  },
  {
    question: "Where is Alva's Education Foundation?",
    answer:
      "Alva's Education Foundation is in Moodbidri, in Dakshina Kannada district, about 35 km from Mangaluru.",
  },
  {
    question: "What can you study at Alva's Education Foundation?",
    answer:
      "Alva's runs institutions from school and pre-university level to degree and professional colleges, including engineering and ayurveda. Check the official website for current courses and admissions.",
  },
  {
    question: "Where is Rajeshwari National School?",
    answer: "Rajeshwari National School is in Sanoor.",
  },
];
