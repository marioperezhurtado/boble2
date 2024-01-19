import { minidenticon } from "minidenticons";

const SATURATION = 60;
const LIGHTNESS = 50;

export function generateIdenticon(str: string) {
  return (
    "data:image/svg+xml;utf8," +
    encodeURIComponent(minidenticon(str, SATURATION, LIGHTNESS))
  );
}
