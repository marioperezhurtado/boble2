import { createEffect, createSignal, Show } from "solid-js";
import { useClickOutside } from "~/utils/click_outside";
import { Trigger } from "./Trigger";
import { Picker } from "./Picker";

export function EmojiPicker(props: { onPick: (emoji: string) => void }) {
  const [isOpen, setIsOpen] = createSignal(false);
  let emojiPicker: HTMLDivElement | undefined = undefined;

  createEffect(() => useClickOutside(emojiPicker!, () => setIsOpen(false)));

  return (
    <div ref={emojiPicker} class="relative">
      <Trigger onToggle={() => setIsOpen(!isOpen())} />
      <Show when={isOpen()}>
        <Picker onPick={props.onPick} />
      </Show>
    </div>
  );
}
