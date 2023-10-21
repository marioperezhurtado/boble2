import { Show, For } from "solid-js";
import { useMessages } from "~/utils/chat";
export function MessageList() {
    const messages = useMessages();
    return (<section class="flex-grow px-4 pt-5 bg-zinc-100">
      <Show when={messages().length === 0}>
        <div class="pt-5 text-center">
          <p class="mb-4 text-lg font-bold">No messages yet.</p>
          <p>Start the conversation to see your messages here.</p>
        </div>
      </Show>
      <ul class="flex flex-col gap-4">
        <For each={messages()}>
          {(message) => (<li class="self-start py-1 px-2.5 bg-white rounded-md border shadow-sm">
              {message}
            </li>)}
        </For>
      </ul>
    </section>);
}
