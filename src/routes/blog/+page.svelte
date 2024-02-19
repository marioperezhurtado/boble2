<script lang="ts">
  import Head from "$lib/ui/Head.svelte";
  import Header from "$lib/ui/Header.svelte";
  import Footer from "$lib/ui/Footer.svelte";

  export let data;
</script>

<Head title="Blog | Boble Web Chat" />

<div class="flex flex-col min-h-dvh">
  <Header />

  <main class="flex-grow my-8 mx-auto max-w-prose sm:my-10">
    <ul>
      {#each data.posts as post}
        <li>
          <a
            href={`blog/${post.slug}`}
            class="block text-lg font-bold underline text-zinc-700"
          >
            <h2>{post.title}</h2>
          </a>
          <p class="my-2 text-zinc-600">{post.description}</p>
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
