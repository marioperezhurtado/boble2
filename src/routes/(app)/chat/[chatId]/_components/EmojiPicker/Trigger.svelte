<script lang="ts">
const DISPLAY_EMOJIS = ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "🥲", "🥹", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🥸", "🤩", "🥳", "😏", "😒", "🥺", "😮", "🤯", "😳", "🥵", "🥶", "😱", "😨", "🫣", "🤗", "🫡", "🤔", "🫢", "🤭", "🤫", "🤥", "😐", "😬", "🫠", "😲", "🥱", "😴", "🤤", "🤐", "🥴", "🤧", "🤒", "🤑", "🤠"];

export let onToggle: () => void;

let displayedEmoji = DISPLAY_EMOJIS[0];

function pickRandomEmoji(): string {
    const randomIndex = Math.floor(Math.random() * DISPLAY_EMOJIS.length);
    const newEmoji = DISPLAY_EMOJIS[randomIndex];
    // Prevent picking the same emoji twice in a row
    if (newEmoji === displayedEmoji) {
      return pickRandomEmoji();
    }
    return newEmoji;
}

</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<button
	on:click={onToggle}
	on:mouseover={() => displayedEmoji = pickRandomEmoji()}
	type="button"
	title="Open emoji picker"
	aria-label="Open emoji picker"
	class="p-0.5 rounded-md focus:outline-cyan-600"
>
	<p class="text-xl transition hover:scale-[115%] grayscale hover:grayscale-0">
		{displayedEmoji}
	</p>
</button>
