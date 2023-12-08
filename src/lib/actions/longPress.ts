const LONG_PRESS_DURATION = 300

export function longPress(
  node: HTMLElement,
  callback: (evt: TouchEvent) => void
) {
  let pressTimer: ReturnType<typeof setTimeout> 

  const startLongPress = (evt: TouchEvent) => {
    if (evt.target !== node) return

    pressTimer = setTimeout(() => callback(evt), LONG_PRESS_DURATION)
  }

  const cancelLongPress = () => {
    clearTimeout(pressTimer)
  }

  document.addEventListener('touchstart', startLongPress)
  document.addEventListener('touchend', cancelLongPress)

  return {
    destroy() {
      document.removeEventListener('touchend', startLongPress)
      document.removeEventListener('touchend', cancelLongPress)
    }
  }
}
