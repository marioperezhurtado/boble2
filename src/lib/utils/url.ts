export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  }
  catch (err) {
    return false;
  }
}

export type LinkPreview = {
  title: string;
  description: string;
  image: string;
}

export async function generateLinkPreview(url: string): Promise<LinkPreview | null> {
  try {
    const response = await fetch("/api/link-preview?url=" + url);
    if (!response.ok) {
      throw new Error("Cannot generate link preview");
    }
    const data = await response.json() as LinkPreview;
    return data;
  } catch (err) {
    return null;
  }
}
