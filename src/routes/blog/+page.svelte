<script lang="ts">
  import Head from "$lib/ui/Head.svelte";
  import Header from "$lib/ui/Header.svelte";
  import Footer from "$lib/ui/Footer.svelte";

  export let data;
</script>

<Head title="Blog | Boble Web Chat" />

<div class="min-h-dvh flex flex-col">
  <Header />

  <main class="my-8 mx-auto max-w-prose sm:my-10 flex-grow">
    <ul>
      {#each data.posts as post}
        <li>
          <a
            href={`blog/${post.slug}`}
            class="block text-lg font-bold text-zinc-700 underline"
          >
            <h2>{post.title}</h2>
          </a>
          <p class="text-zinc-600 my-2">{post.description}</p>
          <time
            class="text-xs text-zinc-500"
            datetime={post.date.toISOString()}
          >
            {post.date.toLocaleDateString()}
          </time>
        </li>
      {/each}
    </ul>
  </main>

  <Footer />
</div>
