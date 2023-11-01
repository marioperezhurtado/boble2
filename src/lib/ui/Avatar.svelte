<script lang="ts">
	import { minidenticon } from 'minidenticons';

	export let image: string | null = null;
	export let name: string;
  export let size: keyof typeof SIZES = "medium";

	const SATURATION = 60;
	const LIGHTNESS = 50;

  const SIZES = {
    small: "w-10 h-10",
    medium: "w-12 h-12",
    large: "w-20 h-20",
  }

	function generateIdenticon(str: string) {
		return (
			'data:image/svg+xml;utf8,' + encodeURIComponent(minidenticon(str, SATURATION, LIGHTNESS))
		);
	}
</script>

{#if image}
	<img
		src={image ?? ''}
		alt={name}
		class="object-cover rounded-full border shadow-inner {SIZES[size]}"
	/>
{:else}
	<div class="flex justify-center items-center bg-white rounded-full
  border shadow-sm {SIZES[size]}">
		<img src={generateIdenticon(name)} alt={name} />
	</div>
{/if}
