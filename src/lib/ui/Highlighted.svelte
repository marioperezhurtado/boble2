<script>
  import Sparkle from "./Sparkle.svelte";
</script>

<strong class="inline-block relative px-1 mt-1 text-white bg-cyan-600 rounded-sm shadow-sm">
  <slot />
  <Sparkle size={20} top="75%" left="5%" duration={1800} delay={350} />
  <Sparkle size={17} top="-15%" left="20%" duration={2200} delay={600} />
  <Sparkle size={18} top="85%" left="50%" duration={1600} delay={1500} />
  <Sparkle size={16} top="-10%" left="70%" duration={1800} delay={1800} />
  <Sparkle size={18} top="75%" left="90%" duration={1600} delay={1000} />
  <Sparkle size={20} top="5%" left="100%" duration={1900} delay={800} />
</strong>
