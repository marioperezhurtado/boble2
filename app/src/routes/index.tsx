import { createSignal } from "solid-js";
import { Title } from "solid-start";
import { io } from "socket.io-client";

const socket = io("http://localhost:8000");

export default function Home() {
  const [text, setText] = createSignal("");

  function sendMessage() {
    socket.emit("message", text());
    setText("");
  }

  return (
    <main>
      <Title>BOBLE Demo</Title>
      <div class="max-w-md mx-auto mt-20">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          class="p-4 flex gap-2"
        >
          <input
            type="text"
            value={text()}
            onInput={(e) => setText(e.target.value)}
            placeholder="Type a message.."
            class="block flex-1 max-w-lg py-1.5 px-2 border rounded-md placeholder:text-zinc-400" 
            autocomplete="off" 
          />
          <button
            class="bg-cyan-700 text-cyan-50 text-sm px-2.5 rounded-md border-t border-t-cyan-600 shadow-md"
          >
            Send
          </button>
        </form>
      </div>
    </main>
  );
}
