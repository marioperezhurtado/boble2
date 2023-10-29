import { Show } from "solid-js";
import { minidenticon } from "minidenticons";

type AvatarProps = {
  image: string | null,
  name: string,
}

export function Avatar(props: AvatarProps) {
  return (
    <Show when={props.image} fallback={<DefaultAvatar name={props.name} />}>
      <img
        src={props.image ?? ""}
        alt={props.name}
        class="object-cover w-12 h-12 rounded-full border shadow-inner"
        width={48}
        height={48}
      />
    </Show>
  );
}

function DefaultAvatar(props: { name: string }) {

  return (
    <div
      class="flex justify-center items-center w-12 h-12 bg-white rounded-full border shadow-sm"
    >
      <img src={generateIdenticon(props.name)} alt={props.name} />
    </div>
  );
}

const SATURATION = 60;
const LIGHTNESS = 50;

function generateIdenticon(str: string) {
  return "data:image/svg+xml;utf8," +  encodeURIComponent(minidenticon(str, SATURATION, LIGHTNESS));
}
