<script lang="ts">
  export let size: number;
  export let top: string;
  export let left: string;
  export let duration: number;
  export let delay: number;
</script>

<svg
  width={size}
  height={size}
  style:top
  style:left
  style:animation-delay={delay + "ms"}
  style:animation-duration={duration + "ms"}
  class="absolute z-10 scale-0 pointer-events-none"
  fill="#fde047"
  viewBox="0 0 256 256"
  xmlns="http://www.w3.org/2000/svg"
>
  <g id="SVGRepo_bgCarrier" stroke-width="0" />
  <g
    id="SVGRepo_tracerCarrier"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  <g id="SVGRepo_iconCarrier">
    <path
      d="M240.58984,128a15.84794,15.84794,0,0,1-10.53125,15.03711l-63.81543,23.206-23.206,63.81543a16.001,16.001,0,0,1-30.07422,0L89.75684,166.24316l-63.81543-23.206a16.001,16.001,0,0,1,0-30.07422L89.75684,89.75684l23.20605-63.81543a16.001,16.001,0,0,1,30.07422,0l23.206,63.81543,63.81543,23.20605A15.84794,15.84794,0,0,1,240.58984,128Z"
    />
  </g>
</svg>

<style>
  svg {
    animation: growAndShrink ease-in-out infinite;
  }

  @keyframes growAndShrink {
    0% {
      transform: scale(0);
    }
    25% {
      transform: scale(1);
    }
    50% {
      transform: scale(0);
    }
    100% {
      transform: scale(0);
    }
  }
</style>
