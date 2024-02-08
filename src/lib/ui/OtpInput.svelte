<script lang="ts">
  import FormError from "$lib/ui/FormError.svelte";

  export let value: string;
  export let numberOfInputs: number;
  export let errors: string[] | null = null;

  let inputs = Array(numberOfInputs).fill(null);

  function handlePaste(e: ClipboardEvent) {
    const pasted = e.clipboardData?.getData("text") ?? "";
    if (pasted.length > numberOfInputs) return;

    value = [
      ...value.slice(0, 0),
      ...pasted.split(""),
      ...value.slice(0 + pasted.length, numberOfInputs),
    ].join("");

    inputs[0 + pasted.length]?.focus();
  }

  function handleInput(input: HTMLInputElement, i: number) {
    const digit = input.value.at(-1)?.toUpperCase() ?? " ";
    input.value = digit;

    value = [
      ...value.slice(0, i),
      digit,
      ...value.slice(i + 1, numberOfInputs),
    ].join("");

    if (digit === " ") return;

    if (i < numberOfInputs - 1) {
      inputs[i + 1].focus();
      return;
    }
    input.blur();
  }
</script>

<ul
  class="grid gap-2 pt-2"
  style="grid-template-columns: repeat({numberOfInputs}, 1fr)"
>
  {#each Array(numberOfInputs) as _, i}
    <li>
      <input
        bind:this={inputs[i]}
        value={value[i] ?? ""}
        on:paste|preventDefault={handlePaste}
        on:input={(e) => handleInput(e.currentTarget, i)}
        class="block py-1.5 aspect-square w-full rounded-md border shadow-sm
  font-bold text-xl placeholder:text-zinc-400 focus:outline-cyan-600 text-center"
      />
    </li>
  {/each}
</ul>

{#if errors}
  <div class="flex flex-col gap-1 pt-2">
    {#each errors as error}
      <FormError message={error} />
    {/each}
  </div>
{/if}
