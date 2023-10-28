import { onCleanup } from "solid-js";

export function useClickOutside(elementRef: HTMLElement, callback: (event: MouseEvent) => void) {
  const handler = (event: MouseEvent) => {
    if (!elementRef.contains(event.target as Node)) {
      callback(event);
    }
  };

  document.addEventListener("click", handler);
  onCleanup(() => document.removeEventListener("click", handler));
}
