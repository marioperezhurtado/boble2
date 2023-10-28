import { createEffect, createSignal, Show } from "solid-js";
import { createServerAction$ } from "solid-start/server";
import { sendMessage } from "~/utils/chat";
import { getServerSession } from "~/auth/auth";
import { addMessage } from "~/db/addMessage";
import { capitalize } from "~/utils/text";
import { EmojiPicker } from "./EmojiPicker/EmojiPicker";

export function SendMessage(props: { chatId: string }) {
  const [text, setText] = createSignal("");

  const [sending, { Form }] = createServerAction$(async (formData: FormData, { request }) => {
    const session = await getServerSession(request);
    if (!session) return;

    const text = formData.get("message") as string;
    if (!text) return;
    const chatId = formData.get("chatId") as string;
    if (!chatId) return;

    const newMessage = await addMessage({
      chatId,
      text,
      senderId: session.id,
    });

    sendMessage(newMessage[0]);
  });

  createEffect(() => {
    if (!sending.pending) {
      setText("");
    }
  });

  return (
    <Form class="flex gap-3 items-center p-2 px-3 border-t bg-zinc-50">
      <EmojiPicker onPick={(emoji) => setText((t) => t + emoji)} />
      <label for="message" class="sr-only">Message</label>
      <input
        id="message"
        name="message"
        type="text"
        value={text()}
        onInput={(e) => setText(capitalize(e.currentTarget.value))}
        placeholder="Type a message"
        class="block py-1.5 px-2 w-full rounded-md border shadow-sm placeholder:text-zinc-400 focus:outline-cyan-600"
        autocomplete="off"
      />
      <input type="hidden" id="chatId" name="chatId" value={props.chatId} />
      <Show when={text()}>
        <button
          type="submit"
          title="Send message"
          aria-label="Send message"
          class="rounded-md focus:outline-cyan-600"
        >
          <img src="/icons/send.svg" alt="Send message" class="w-7 h-7" />
        </button>
      </Show>
      <Show when={!text()}>
        <button
          type="button"
          title="Record audio"
          aria-label="Record audio"
          class="rounded-md focus:outline-cyan-600"
        >
          <img src="/icons/microphone.svg" alt="Record audio" class="w-7 h-7" />
        </button>
      </Show>
    </Form>);
}
