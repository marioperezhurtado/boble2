export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
}

export function getFileUrl(fileId: string): string {
  return `http://localhost:5000/boble-files/${fileId}`;
}
