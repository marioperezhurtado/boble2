<script lang="ts">
  export let text: string;
  export let isOwn: boolean;

  let encryptedText = text.split("").map(randomChar).join("");
  let interval: ReturnType<typeof setInterval>;

  function randomChar() {
    return String.fromCharCode(Math.floor(Math.random() * (126 - 33) + 33));
  }

  function decrypt() {
    if (encryptedText === text) {
      return;
    }
    if (interval) {
      clearInterval(interval);
    }

    let iteration = 0;

    interval = setInterval(() => {
      encryptedText = encryptedText
        .split("")
        .map((_, i) => {
          if (i < iteration) {
            return text[i];
          }
          return randomChar();
        })
        .join("");

      if (iteration >= encryptedText.length) {
        clearInterval(interval);
      }

      iteration++;
    }, 100);
  }
</script>

<li
  on:mouseenter={decrypt}
  class={`flex relative gap-x-2 justify-between items-end p-1.5 px-2.5 rounded-md shadow-sm md:select-auto w-fit 
  ${
    isOwn
      ? "rounded-tr-none self-end bg-cyan-700 text-white"
      : "rounded-tl-none self-start bg-white"
  }`}
>
  <p class="font-mono text-sm select-none">{encryptedText}</p>

  <span
    class={`absolute top-0 w-0 h-0 border-transparent border-t-[10px]
        ${
          isOwn
            ? "border-t-cyan-700 border-r-[5px] -right-1"
            : "border-t-white border-l-[5px] -left-1"
        }
      `}
  />
</li>
