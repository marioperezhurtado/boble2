export const EMOJI_CATEGORIES = [
  {
    title: "Recent",
    icon: "/icons/emojis/recent.svg",
    slug: "recent",
  },
  {
    title: "Smileys & People",
    icon: "/icons/emojis/smileys-and-people.svg",
    slug: "smileys-and-people",
  },
  {
    title: "Animals & Nature",
    icon: "/icons/emojis/animals-and-nature.svg",
    slug: "animals-and-nature",
  },
  {
    title: "Food & Drink",
    icon: "/icons/emojis/food-and-drink.svg",
    slug: "food-and-drink",
  },
  {
    title: "Travel & Places",
    icon: "/icons/emojis/travel-and-places.svg",
    slug: "travel-and-places",
  },
  {
    title: "Activities",
    icon: "/icons/emojis/activities.svg",
    slug: "activities",
  },
  {
    title: "Objects",
    icon: "/icons/emojis/objects.svg",
    slug: "objects",
  },
  {
    title: "Symbols",
    icon: "/icons/emojis/symbols.svg",
    slug: "symbols",
  },
] as const;

export type Category = typeof EMOJI_CATEGORIES[number];
