import { createSignal, For, Show } from "solid-js";
import { capitalize } from "~/utils/text";
import { EMOJI_CATEGORIES } from "./categories";
import emojis from "./emojis.json";
import { Category } from "./Category";
import { FilterEmojis } from "./FilterEmojis";

export type Emoji = typeof emojis["smileys-and-people"][0];
export const [hoveredEmoji, setHoveredEmoji] = createSignal<Emoji | null>(null);

export function parseUnicodeEmoji(emoji: string) {
  return String.fromCodePoint(parseInt(emoji, 16));
}

export function Picker(props: { onPick: (emoji: string) => void }) {
  const [filteredEmojis, setFilteredEmojis] = createSignal(emojis);

  function handlePick(emoji: string) {
    props.onPick(parseUnicodeEmoji(emoji));
  }

  function scrollToCategory(category: string) {
    const categoryElement = document.getElementById(category);
    if (categoryElement) {
      categoryElement.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <div class="absolute bottom-12 w-80 bg-white rounded-md border shadow-md">
      <FilterEmojis setEmojis={setFilteredEmojis} />
      <div class="flex justify-around items-center px-2 pt-1 border-b">
        <For each={EMOJI_CATEGORIES}>
          {(category) => (
            <button
              onClick={() => scrollToCategory(category.slug)}
              aria-label={category.title}
              title={category.title}
              type="button"
              class="p-1.5 border-b-2 border-transparent"
            >
              <img src={category.icon} alt={category.title} class="w-4 h-4" />
            </button>
          )}
        </For>
      </div>

      <section
        id="emoji-list"
        class="overflow-y-scroll h-96"
      >
        <For each={EMOJI_CATEGORIES}>
          {(category) => (
            <Category
              category={category}
              emojis={filteredEmojis()}
              onPick={handlePick}
            />
          )}
        </For>
      </section>

      <Show when={hoveredEmoji()}>
        <div class="flex gap-2.5 items-center p-2 border-t">
          <p class="p-0.5 text-2xl">
            {parseUnicodeEmoji(hoveredEmoji()!.u)}
          </p>
          <p class="text-sm font-medium">
            {capitalize(hoveredEmoji()!.n[0])}
          </p>
        </div>
      </Show>
    </div>
  );
}
