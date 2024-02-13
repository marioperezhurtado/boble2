import { error } from "@sveltejs/kit";
import { getPosts } from "../getPosts";
import type { EntryGenerator, PageServerLoad } from "./$types";

export const entries: EntryGenerator = async () => {
  const posts = await getPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export const load: PageServerLoad = async ({ params, parent }) => {
  const { posts } = await parent();

  const post = posts.find((post) => post.slug === params.slug);

  if (!post) {
    throw error(404, "Not found");
  }

  return { post };
}
