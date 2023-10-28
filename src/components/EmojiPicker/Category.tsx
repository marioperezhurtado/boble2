import { createSignal, createEffect, For, Show } from "solid-js";
import { setHoveredEmoji, parseUnicodeEmoji } from "./Picker";
import emojis from "./emojis.json";
import type { Category } from "./categories";

type CategoryProps = {
  category: Category;
  emojis: typeof emojis;
  onPick: (emoji: string) => void;
};

export const [currentCategory, setCurrentCategory]
  = createSignal<Category["slug"]>("recent");

export function Category(props: CategoryProps) {
  createEffect(() => {
    // Update currentCategory when the category slug id is in view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCurrentCategory(props.category.slug);
        }
      });
    });

    const categoryElement = document.getElementById(props.category.slug);
    if (categoryElement) {
      observer.observe(categoryElement);
    }
  }, {
    root: document.getElementById("emoji-list"),
    threshold: 1,
  });

  return (
    <>
      <h2 class="sticky top-0 py-2 px-2 text-xs font-bold tracking-wider uppercase bg-white border-b text-zinc-400">
        {props.category.title}
      </h2>
      <Show when={props.emojis[props.category.slug].length > 0}>
        <ul
          id={props.category.slug}
          class="grid grid-cols-8 gap-0.5 p-2"
        >
          <For each={props.emojis[props.category.slug]}>
            {(emoji) => (
              <li class="flex justify-center items-center">
                <button
                  onClick={() => props.onPick(emoji.u)}
                  onMouseOver={() => setHoveredEmoji(emoji)}
                  type="button"
                  class="w-7 h-7 text-xl rounded-md hover:bg-zinc-200"
                >
                  {parseUnicodeEmoji(emoji.u)}
                </button>
              </li>
            )}
          </For>
        </ul>
      </Show>
    </>
  );
}
