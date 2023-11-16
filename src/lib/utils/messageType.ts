export function containsAnyExtension(url: string, extensions: string[]) {
  try {
    const urlObject = new URL(url);
    const extension = urlObject.pathname.split('.').pop();
    if (!extension) return false;

    return extensions.includes(extension.toLowerCase());
  } catch (e) {
    return false;
  }
}

export function isImage(imageUrl: string): boolean {
  return containsAnyExtension(imageUrl, [
    "jpg",
    "jpeg",
    "png",
    "svg",
    "webp",
  ]);
}

export function isGif(imageUrl: string) {
  return imageUrl.includes("giphy.com");
}
