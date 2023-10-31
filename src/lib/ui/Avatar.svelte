<script lang="ts">
	import { minidenticon } from 'minidenticons';

	export let image: string | null = null;
	export let name: string;

	const SATURATION = 60;
	const LIGHTNESS = 50;

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
		class="object-cover w-12 h-12 rounded-full border shadow-inner"
		width={48}
		height={48}
	/>
{:else}
	<div class="flex justify-center items-center w-12 h-12 bg-white rounded-full border shadow-sm">
		<img src={generateIdenticon(name)} alt={name} />
	</div>
{/if}
