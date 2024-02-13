<script lang="ts">
  import { marked }from "marked";
  import Head from "$lib/ui/Head.svelte";
  import Header from "$lib/ui/Header.svelte";
  import Footer from "$lib/ui/Footer.svelte";

  export let data;
</script>

<!-- Hacky fix for the styles not being applied to @html rendered content -->
<Head
  title="{data.post.title} | Boble Web Chat"
  description={data.post.description}
>
  <style>
    #post h2 {
      font-size: 1.125rem;
      line-height: 1.75rem;
      font-weight: 700;
      margin-top: 2.5rem;
      margin-bottom: 0.5rem;
      color: rgb(63 63 70);
    }

    #post h3 {
      font-size: 1rem;
      line-height: 1.5rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: rgb(63 63 70);
    }

    #post p {
      margin-bottom: 1rem;
      font-size: 1rem;
      line-height: 1.5rem !important;
      color: rgb (82 82 91);
    }

    #post strong {
      font-weight: 600;
    }

    #post a {
      color: rgb(14 116 144);
      text-decoration: underline;
    }
  </style>
</Head>

<Header />

<main class="my-8 mx-auto max-w-prose sm:my-10">
  <a
    href="/blog"
    class="block pb-4 underline text-cyan-700 font-medium"
  >
    ⬅ Back
  </a>

  <h1 class="pb-4 text-xl font-bold">{data.post.title}</h1>
  <p class="text-zinc-600">{data.post.description}</p>
  <time class="text-xs text-zinc-500 pt-4 block" datetime={data.post.date.toISOString()}>
    {data.post.date.toLocaleDateString()}
  </time>

  <hr class="my-8" />

  <section id="post">
    {@html marked(data.post.content)}
  </section>
</main>

<Footer />
