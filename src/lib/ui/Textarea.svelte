<script lang="ts">
  import FormError from "./FormError.svelte";

  export let maxLength: number;
  export let value: string;
  export let info: string | null = null;
  export let errors: string[] | null = null;
</script>

<div class="relative">
  <textarea
    bind:value
    class="block py-1.5 px-2 w-full rounded-md border shadow-sm
  placeholder:text-zinc-400 focus:outline-cyan-600 {$$restProps.class}"
    class:focus:outline-red-500={value?.length > maxLength}
    {...$$restProps}
  />
  <span
    class="absolute bottom-0.5 right-3 p-0.5 text-xs bg-white bg-opacity-50 rounded-md pointer-events-none backdrop-blur-sm"
    class:text-red-500={value.length > maxLength}
    class:text-zinc-500={value.length <= maxLength}
  >
    {value.length}/{maxLength}
  </span>
</div>

{#if info}
  <p class="pt-2 text-xs font-normal text-zinc-500">
    {info}
  </p>
{/if}

{#if errors}
  <div class="flex flex-col gap-1 pt-2">
    {#each errors as error}
      <FormError message={error} />
    {/each}
  </div>
{/if}
