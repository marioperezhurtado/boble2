import { A, type AnchorProps } from "@solidjs/router";

export function Link(props: AnchorProps) {
  return (
    <A
      {...props}
      class="font-medium text-cyan-700 underline transition hover:brightness-110">
      {props.children}
    </A>
  );
}
