import { createSignal, Show } from "solid-js";
import { sendMessage } from "~/utils/chat";
export function SendMessage() {
    const [text, setText] = createSignal("");
    function handleSubmit(e) {
        e.preventDefault();
        if (!text())
            return;
        sendMessage(text());
        setText("");
    }
    return (<form onSubmit={handleSubmit} class="flex gap-3 items-center p-2 px-3 border-t bg-zinc-50">
      <button type="button" title="Open emoji picker" aria-label="Open emoji picker" class="rounded-md focus:outline-cyan-600">
        <img src="/icons/emoji.svg" alt="Open emoji picker" class="w-7 h-7"/>
      </button>
      <button type="button" title="Attach media" aria-label="Attach media" class="rounded-md focus:outline-cyan-600">
        <img src="/icons/attach.svg" alt="Attach media" class="w-7 h-7"/>
      </button>

      <label for="message" class="sr-only">Message</label>
      <input id="message" name="message" type="text" value={text()} onInput={(e) => setText(e.target.value)} placeholder="Type a message..." class="block py-1.5 px-2 w-full rounded-md border shadow-sm placeholder:text-zinc-400 focus:outline-cyan-600" autocomplete="off"/>
      <Show when={text()}>
        <button type="submit" title="Send message" aria-label="Send message" class="rounded-md focus:outline-cyan-600">
          <img src="/icons/send.svg" alt="Send message" class="w-7 h-7"/>
        </button>
      </Show>
      <Show when={!text()}>
        <button type="button" title="Record audio" aria-label="Record audio" class="rounded-md focus:outline-cyan-600">
          <img src="/icons/microphone.svg" alt="Record audio" class="w-7 h-7"/>
        </button>
      </Show>
    </form>);
}
