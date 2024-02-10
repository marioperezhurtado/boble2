<script lang="ts">
  export let title: string;
  export let latitude: number;
  export let longitude: number;
</script>
    
<iframe
  title={title}
  src="https://maps.google.com/maps?q={latitude},{longitude}&output=embed"
  {...$$restProps}
  class="bg-zinc-50 {$$restProps.class}"
/>
