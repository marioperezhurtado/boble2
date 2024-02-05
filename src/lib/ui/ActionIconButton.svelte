<script lang="ts">
  export let title: string;
  export let icon: string;
</script>

<button
  {...$$restProps}
  type="button"
  class="flex justify-center items-center p-2 rounded-full transition-all
  bg-zinc-100 aspect-square hover:brightness-95 border {$$restProps.class}"
  {title}
  on:click
>
  <img src={icon} alt={title} class="w-5 h-5 xs:w-4 xs:h-4" />
</button>
