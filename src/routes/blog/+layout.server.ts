import { getPosts } from "./getPosts";
import type { LayoutServerLoad } from "./$types";

// Serve blog as static html
export const prerender = true;

export const load: LayoutServerLoad = async () => {
  const posts = await getPosts();
 
  return { posts };
}
