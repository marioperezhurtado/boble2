import { Header } from "~/components/Header";
import type { JSX } from "solid-js";

export function AuthLayout(props: { children: JSX.Element }) {
  return (
    <>
      <Header />
      <main class="flex flex-col gap-14 justify-center items-center pt-20 lg:flex-row lg:gap-10 lg:items-start">
        <section class="flex flex-col justify-center p-6 w-full max-w-md bg-white rounded-md border shadow-md">
          {props.children}
        </section>
        <section class="flex gap-3 w-full max-w-md lg:pt-6">
          <img
            src="/boble.svg"
            alt="BOBLE logo"
            class="w-12 h-12"
          />
          <div>
            <h1 class="text-lg font-bold">
              <span class="tracking-wide">BOBLE </span>
              Web Chat
            </h1>
            <p class="pt-1 text-sm">
              Chat with your friends and family from any device.
            </p>
          </div>
        </section>
      </main>
    </>
  );
};
