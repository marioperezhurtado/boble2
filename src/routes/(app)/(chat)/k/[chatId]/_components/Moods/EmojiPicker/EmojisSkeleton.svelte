<script lang="ts">
  const PLACEHOLDER_EMOJIS =
    "😀😃😄😁😆😅🤣😂🙂🙃🫠😉😊😇🥰😍🤩😘😗☺😚😙🥲😋😛😜🤪😝🤑🤗🤭🫢🫣🤫🤔🫡🤐🤨😐😑😶🫥😶😏😒🙄😬😮🤥😌😔😪🤤😴😷🤒🤕🤢🤮🤧🥵🥶🥴😵😵🤯🤠🥳🥸😎🤓🧐😕🫤😟🙁☹😮😯😲😳";
</script>

<h2
  class="p-2 text-xs font-bold tracking-wider uppercase bg-white border-b text-zinc-400"
>
  Smileys & People
</h2>
<div class="grid grid-cols-9 gap-1.5 p-2 animate-pulse">
  {#each PLACEHOLDER_EMOJIS.split(/(?=.)/u) as emoji}
    <div
      class="flex justify-center items-center w-full text-2xl rounded-md aspect-square"
    >
      {emoji}
    </div>
  {/each}
</div>
