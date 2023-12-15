<script lang="ts">
  export let step: number;
  export let title: string;
  export let description: string;
</script>

<div>
  <figure class="flex justify-center items-center mx-auto font-bold text-white rounded-full shadow-md circle">
    {step}
  </figure>
  <p class="pt-6 pb-2 text-lg font-bold">{title}</p>
  <p class="mx-auto w-60 text-sm text-zinc-500">{description}</p>
</div>

<style>
  .circle {
    height: 35px;
    width: 35px;
    background: radial-gradient(circle at 0px 0px, #22d3ee, #0e7490);
  }
</style>
