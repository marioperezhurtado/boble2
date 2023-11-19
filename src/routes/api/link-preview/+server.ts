import { error, json } from '@sveltejs/kit';
import { getSessionRequired } from '$lib/auth/auth';
import type { RequestHandler } from './$types';

function decodeHtml(html: string): string {
  return html.replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(dec));
}

export const GET: RequestHandler = async ({ url, locals }) => {
  await getSessionRequired(locals.auth);

  const linkUrl = url.searchParams.get('url');
  if (!linkUrl) {
    throw error(400, 'Missing url');
  }

  const response = await fetch(linkUrl);
  if (!response.ok) {
    throw error(400, 'Cannot generate link preview');
  }

  const html = await response.text();
  const decodedHtml = decodeHtml(html);

  const title = decodedHtml.match(/<title>(.*?)<\/title>/)?.[1];
  const description = decodedHtml.match(/<meta name="description" content="(.*?)">/)?.[1];
  const image = decodedHtml.match(/<meta property="og:image" content="(.*?)">/)?.[1];

  return json({ title, description, image, });
};
