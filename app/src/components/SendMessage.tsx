import { createSignal, Show } from "solid-js";
import { sendMessage } from "~/utils/chat";


export function SendMessage() {
  const [text, setText] = createSignal("");

  function handleSubmit(e: Event) {
    e.preventDefault();
    if (!text()) return;

    sendMessage(text());
    setText("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      class="flex gap-2 p-2 border-t bg-zinc-50"
    >
      <label for="message" class="sr-only">Message</label>
      <div class="relative flex-1">
        <input
          id="message"
          name="message"
          type="text"
          value={text()}
          onInput={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          class="block py-1.5 pr-12 pl-2 w-full rounded-md border shadow-sm placeholder:text-zinc-400 focus:outline-cyan-600"
          autocomplete="off"
        />
        <Show when={text()}>
          <button
            type="submit"
            aria-label="Send message"
            class="absolute right-0 top-1/2 py-1 px-2 rounded-md -translate-y-1/2 focus:outline-cyan-600"
          >
            <img src="/icons/send.svg" alt="Send message" class="w-6 h-6" />
          </button>
        </Show>
      </div>
    </form>);
}
