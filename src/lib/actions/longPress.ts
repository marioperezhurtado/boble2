const LONG_PRESS_DURATION = 300;

export function longPress(
  node: HTMLElement,
  callback: (e: TouchEvent) => void,
) {
  let pressTimer: ReturnType<typeof setTimeout>;

  function startLongPress(e: TouchEvent) {
    if (e.target !== node) return;

    pressTimer = setTimeout(() => callback(e), LONG_PRESS_DURATION);
  }

  function cancelLongPress() {
    clearTimeout(pressTimer);
  }

  document.addEventListener("touchstart", startLongPress);
  document.addEventListener("touchend", cancelLongPress);

  return {
    destroy() {
      document.removeEventListener("touchstart", startLongPress);
      document.removeEventListener("touchend", cancelLongPress);
    },
  };
}
