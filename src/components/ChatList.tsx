import { For, Show } from "solid-js";
import { A, useParams } from "@solidjs/router";

const DUMMY_CHATS = [
  {
    id: "c1",
    user: {
      id: "u1",
      name: "John Doe",
      image: "https://fakeimg.pl/600x400",
    },
    lastMessage: {
      text: "Did you see the new episode?",
      createdAt: new Date(),
    },
    unreadMessages: 1,
  },
  {
    id: "c2",
    user: {
      id: "u2",
      name: "Arthur Morgan",
      image: "https://fakeimg.pl/600x400",
    },
    lastMessage: {
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
      createdAt: new Date(),
    },
    unreadMessages: 0,
  },
  {
    id: "c3",
    user: {
      id: "u3",
      name: "Mary Jane",
      image: "https://fakeimg.pl/600x400",
    },
    lastMessage: {
      text: "Thank you, see you soon! 👍",
      createdAt: new Date(),
    },
    unreadMessages: 999,
  },
];

export function ChatList() {
  const params = useParams<{ chatId: string }>();

  return (
    <section class="w-full max-w-sm bg-zinc-50">
      <div class="flex gap-2 p-2">
        <input
          id="message"
          name="message"
          type="search"
          placeholder="Search chats..."
          class="py-1.5 px-2 w-full text-sm rounded-md border shadow-sm placeholder:text-zinc-400 focus:outline-cyan-600"
          autocomplete="off"
        />
        <button
          type="button"
          title="Sort chats"
          aria-label="Sort chats"
          class="rounded-md focus:outline-cyan-600"
        >
          <img src="/icons/sort.svg" alt="Sort chats" class="w-6 h-6" />
        </button>
      </div>
      <ul class="border-t">
        <For each={DUMMY_CHATS}>
          {(chat) => (
            <li>
              <A href={`/${chat.id}`}
                class="flex gap-3 p-2 border-b border-r-[3px] border-r-transparent"
                classList={{
                  "bg-zinc-100 !border-r-cyan-600": params.chatId === chat.id,
                }}
              >
                <img src={chat.user.image} alt={chat.user.name} class="object-cover w-12 h-12 rounded-full shadow-inner" />
                <div class="flex flex-col flex-1 gap-0.5">
                  <p class="font-medium">{chat.user.name}</p>
                  <p
                    class="w-64 text-sm text-zinc-600 truncate"
                    title={chat.lastMessage.text}>
                    {chat.lastMessage.text}
                  </p>
                </div>

                <div class="flex flex-col justify-between items-end py-1">
                  <time class="text-xs text-zinc-600">
                    {chat.lastMessage.createdAt.toLocaleTimeString("es-ES", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </time>
                  <Show when={chat.unreadMessages > 0}>
                    <p class="px-1.5 pt-0.5 font-mono text-xs text-center text-cyan-50 bg-cyan-600 rounded-full">
                      {chat.unreadMessages}
                    </p>
                  </Show>
                </div>
              </A>
            </li>
          )}
        </For>
      </ul>
    </section>
  );
}

