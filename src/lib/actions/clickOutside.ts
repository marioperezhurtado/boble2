export function clickOutside(
  node: HTMLElement,
  callback: (evt: MouseEvent) => void
) {
  const handleClick = (evt: MouseEvent) => {
    if (!node.contains(evt.target as Node)) {
      callback(evt)
    }
  }

  document.addEventListener('click', handleClick)

  return {
    destroy() {
      document.removeEventListener('click', handleClick)
    }
  }
}
