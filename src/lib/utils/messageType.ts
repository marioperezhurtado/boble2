export function isImage(imageUrl: string): boolean {
  const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'svg'];

  try {
    const url = new URL(imageUrl);
    const extension = url.pathname.split('.').pop();
    if (!extension) return false;

    return IMAGE_EXTENSIONS.includes(extension);
  } catch (e) {
    return false;
  }
}
