import type { StaticImageData } from "next/image";
import koriRottiImg from "@/assets/about/kori-rotti-mangalorean-cuisine.jpg";
import BANGUDEPULIMUNCHIImg from "@/assets/about/BANGUDE PULIMUNCHI.jpeg";
import chickengheeroastImg from "@/assets/about/chicken-ghee-roast-square-2-1.jpg";
import neerdosaImg from "@/assets/about/NEER DOSA.jpeg";
import FISHRAVAFRYImg from "@/assets/about/FISH RAVA FRY.jpeg";
import PRAWN_GASSIImg from "@/assets/about/PRAWN GASSI.jpg";
import GOLIBAJEImg from "@/assets/about/GOLI BAJE.jpg";
import PATRODEImg from "@/assets/about/PATRODE.jpeg";
import KOTTEKADUBUImg from "@/assets/about/KOTTE KADUBU.jpeg";
import MANGALORE_BUNSImg from "@/assets/about/MANGALORE BUNS.jpeg";
import GADBAD_ICE_CREAMImg from "@/assets/cuisine/gadbad-ice-cream.jpg";
// Content for the /cuisine page. To use a photo for a dish: add it under src/assets/cuisine/, import it here
// and set `image`.

export const courses = [
  { id: "seafood", label: "Seafood" },
  { id: "meat", label: "Chicken & meat" },
  { id: "veg", label: "Vegetarian" },
  { id: "breakfast", label: "Breakfast" },
  { id: "sweet", label: "Sweets" },
] as const;

export type CourseId = (typeof courses)[number]["id"];

export type Dish = {
  id: string;
  name: string;
  // Name as it is known locally (Tulu, Kannada or Konkani), where it differs.
  localName?: string;
  course: CourseId;
  veg: boolean;
  // 0 = mild, 3 = fiery
  spice: 0 | 1 | 2 | 3;
  teaser: string;
  description: string;
  pairWith: string;
  image?: StaticImageData;
  imageAlt?: string;
};

export const dishes: Dish[] = [
  {
    id: "chicken-ghee-roast",
    name: "Chicken Ghee Roast",
    course: "meat",
    veg: false,
    spice: 3,
    teaser: "Fiery red, rich with ghee. Mangaluru's signature dish.",
    description:
      "Chicken roasted in a thick, tangy paste of red Byadgi chillies and spices, finished with generous amounts of ghee. Deep red, intensely flavoured and the dish most people come to Mangaluru to try.",
    pairWith: "Neer dosa or soft rice wafers",
    image: chickengheeroastImg,
    imageAlt: "Mangalorean chicken ghee roast: tender chicken in a rich, spicy gravy",
  },
  
  {
    id: "kori-rotti",
    name: "Kori Rotti",
    localName: "Kori Rotti (Tulu)",
    course: "meat",
    veg: false,
    spice: 2,
    teaser: "Chicken curry poured over crisp rice wafers.",
    description:
      "A Tulunadu classic: a coconut-rich chicken curry ('kori') served with dry, crisp rice wafers ('rotti'). The curry is poured over the rotti just before eating, so they soften while keeping some crunch.",
    pairWith: "Eat it straight away, before the rotti goes soft",
    image: koriRottiImg,
    imageAlt:
      "Mangalorean kori rotti: chicken curry in a bowl with crisp rice wafers on the side",
  },
  {
    id: "neer-dosa",
    name: "Neer Dosa",
    course: "breakfast",
    veg: true,
    spice: 0,
    teaser: "Soft, lacy rice crepes, light as water.",
    description:
      "'Neer' means water: the batter is so thin that these rice crepes come out soft, delicate and almost translucent. Eaten for breakfast or alongside curries at any meal.",
    pairWith: "Chicken ghee roast, fish curry or coconut chutney",
    image: neerdosaImg,
    imageAlt: "Mangalorean neer dosa: soft, lacy rice crepes, light as water",
  },
  {
    id: "bangude-pulimunchi",
    name: "Bangude Pulimunchi",
    localName: "Bangude Pulimunchi (Tulu)",
    course: "seafood",
    veg: false,
    spice: 3,
    teaser: "Mackerel in a sour, spicy red gravy.",
    description:
      "'Puli' means sour and 'munchi' means chilli: mackerel ('bangude') cooked in a sharp, tangy gravy of tamarind and red chillies. Bold and best eaten with plain boiled rice.",
    pairWith: "Red boiled rice",
    image: BANGUDEPULIMUNCHIImg,
    imageAlt: "Mangalorean bangude pulimunchi: mackerel in a sour, spicy red gravy",
  },
  {
    id: "fish-rava-fry",
    name: "Fish Rava Fry",
    course: "seafood",
    veg: false,
    spice: 2,
    teaser: "Masala-coated fish, crisp with semolina.",
    description:
      "Slices of kingfish ('anjal'), pomfret or ladyfish marinated in red masala, coated in semolina and shallow-fried until crunchy. A staple of every seafood restaurant on the coast.",
    pairWith: "A fish thali or a squeeze of lime",
    image: FISHRAVAFRYImg,
    imageAlt: "Mangalorean fish rava fry: masala-coated fish, crisp with semolina",
  },
  {
    id: "prawn-gassi",
    name: "Prawn Gassi",
    course: "seafood",
    veg: false,
    spice: 2,
    teaser: "Prawns in a coconut and roasted-spice curry.",
    description:
      "'Gassi' is a coastal curry of coconut and roasted spices. With prawns it becomes one of the most loved seafood curries in Mangaluru: rich, aromatic and gently spiced.",
    pairWith: "Neer dosa or rice",
    image: PRAWN_GASSIImg,
    imageAlt: "Mangalorean prawn gassi: prawns in a coconut and roasted-spice curry",
  },
  {
    id: "goli-baje",
    name: "Goli Baje",
    localName: "Mangalore Bajji",
    course: "veg",
    veg: true,
    spice: 1,
    teaser: "Fluffy fried fritters, the city's favourite snack.",
    description:
      "Soft, airy fritters made from a fermented batter of flour and curd, fried until golden outside and spongy inside. The go-to tea-time snack across Mangaluru.",
    pairWith: "Coconut chutney and a cup of tea",
    image: GOLIBAJEImg,
    imageAlt: "Mangalorean goli baje: fluffy fried fritters, the city's favourite snack",
  },
  {
    id: "patrode",
    name: "Patrode",
    course: "veg",
    veg: true,
    spice: 1,
    teaser: "Colocasia leaves rolled with spiced rice paste.",
    description:
      "Colocasia leaves layered with a spiced rice and coconut paste, rolled, steamed and then sliced, often pan-fried afterwards. A monsoon favourite in coastal homes.",
    pairWith: "Ghee and a cup of coffee",
    image: PATRODEImg,
    imageAlt: "Mangalorean patrode: colocasia leaves rolled with spiced rice paste",
  },
  {
    id: "kotte-kadubu",
    name: "Kotte Kadubu",
    course: "breakfast",
    veg: true,
    spice: 0,
    teaser: "Idlis steamed in jackfruit-leaf cups.",
    description:
      "Idli batter steamed inside little cups woven from jackfruit leaves, which give the idlis a subtle, earthy aroma. Often served for breakfast on special occasions.",
    pairWith: "Chutney or a spicy curry",
    image: KOTTEKADUBUImg,
    imageAlt: "Mangalorean kotte kadubu: idlis steamed in jackfruit-leaf cups",
  },
  {
    id: "mangalore-buns",
    name: "Mangalore Buns",
    course: "breakfast",
    veg: true,
    spice: 0,
    teaser: "Sweet, fluffy banana puris.",
    description:
      "Puris made from a dough of ripe bananas and flour, lightly sweet and soft, puffed up in hot oil. A favourite breakfast or evening snack in Udupi and Mangaluru restaurants.",
    pairWith: "Coconut chutney or sambar",
    image: MANGALORE_BUNSImg,
    imageAlt: "Mangalorean mangalore buns: sweet, fluffy banana puris",
  },
  {
    id: "gadbad",
    name: "Gadbad Ice Cream",
    course: "sweet",
    veg: true,
    spice: 0,
    teaser: "A tall glass of ice cream, fruit and jelly.",
    description:
      "Layers of ice cream, chopped fruit, jelly, nuts and syrup piled into a tall glass. Mangaluru's famous ice-cream sundae, made popular by the city's long-running ice-cream parlours.",
    pairWith: "A long spoon and a hot afternoon",
    image: GADBAD_ICE_CREAMImg,
    imageAlt: "Mangalorean gadbad ice cream: a tall glass of ice cream, fruit and jelly",
  },
];

export const faqs: { question: string; answer: string }[] = [
  {
    question: "What is Mangaluru's most famous dish?",
    answer:
      "Chicken ghee roast is Mangaluru's best-known dish: chicken roasted in a fiery red chilli paste and finished with ghee. Kori rotti and neer dosa are close favourites.",
  },
  {
    question: "Is Mangalorean food very spicy?",
    answer:
      "Many dishes use red Byadgi chillies, which give a deep red colour with moderate heat, but some curries like bangude pulimunchi are quite fiery. Neer dosa, kotte kadubu and gadbad ice cream are mild options.",
  },
  {
    question: "What vegetarian food should I try in Mangaluru?",
    answer:
      "Try goli baje, patrode, neer dosa with chutney, kotte kadubu, Mangalore buns and a gadbad ice cream for dessert.",
  },
  {
    question: "What does neer dosa mean?",
    answer:
      "'Neer' means water in Tulu and Kannada. Neer dosa is a thin, soft rice crepe made from a very watery batter.",
  },
];
