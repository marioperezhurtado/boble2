const DEFAULT_WAIT = 300;

export function debounce(callback: Function, wait = DEFAULT_WAIT) {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: any[]) => {
    clearTimeout(timeout!);
    timeout = setTimeout(() => callback(...args), wait);
  };
}
