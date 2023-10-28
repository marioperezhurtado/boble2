import { createSignal } from "solid-js";

const DISPLAY_EMOJIS = ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "🥲", "🥹", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🥸", "🤩", "🥳", "😏", "😒", "🥺", "😮", "🤯", "😳", "🥵", "🥶", "😱", "😨", "🫣", "🤗", "🫡", "🤔", "🫢", "🤭", "🤫", "🤥", "😐", "😬", "🫠", "😲", "🥱", "😴", "🤤", "🤐", "🥴", "🤧", "🤒", "🤑", "🤠"];

export function Trigger(props: { onToggle: () => void }) {
  const [displayedEmoji, setDisplayedEmoji] = createSignal("😀");

  function pickRandomEmoji(): string {
    const randomIndex = Math.floor(Math.random() * DISPLAY_EMOJIS.length);
    const newEmoji = DISPLAY_EMOJIS[randomIndex];
    // Prevent picking the same emoji twice in a row
    if (newEmoji === displayedEmoji()) {
      return pickRandomEmoji();
    }
    return newEmoji;
  }

  return (
    <button
      onClick={props.onToggle}
      onMouseOver={() => setDisplayedEmoji(pickRandomEmoji())}
      type="button"
      title="Open emoji picker"
      aria-label="Open emoji picker"
      class="rounded-md focus:outline-cyan-600"
    >
      <p class="text-xl transition hover:scale-[115%] grayscale hover:grayscale-0">
        {displayedEmoji()}
      </p>
    </button>
  );
}
