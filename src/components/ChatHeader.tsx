import { Session } from "@auth/core/types";
import { A } from "@solidjs/router";

export function ChatHeader(props: { session: Session }) {
  const dummySession: Session = {
    id: "1",
    user: {
      email: "example@email.com",
      name: "Example User",
      image: "https://i.pravatar.cc/150?img=3",
    },
    expires: "asd",
  };

  props.session = dummySession;

  return (
    <header class="flex w-full text-cyan-50 bg-cyan-900">
      <div class="flex justify-between items-center py-2.5 px-4 mx-auto w-full max-w-screen-2xl">
        <a href="/chat" class="flex gap-2.5 items-center">
          <img src="/icons/boble-light.svg" alt="BOBLE logo" class="w-5 h-5" />
          <h1 class="text-lg font-bold tracking-wide">BOBLE</h1>
        </a>
        <nav>
          <ul class="flex gap-2 text-sm">
            <NavLink
              href="/profile"
              icon="/icons/profile.svg"
              text={props.session.user?.email ?? "Profile"}
            />
            <NavLink text="Logout" icon="/icons/logout.svg" href="/logout" />
          </ul>
        </nav>
      </div>
    </header>
  );
}

function NavLink(props: { text: string, icon: string, href: string }) {
  return (
    <li>
      <A
        href={props.href}
        class="flex gap-1 items-center px-2 py-1 bg-cyan-700 rounded-md border-t shadow-sm border-t-cyan-600 pr-1.5"
      >
        <span>{props.text}</span>
        <img src={props.icon} alt={props.text} class="w-3.5 h-3.5" />
      </A>
    </li>
  );
}
