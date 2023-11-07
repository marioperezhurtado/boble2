<div class="relative -ml-3 w-12 md:w-24">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="800"
    height="800"
    fill="none"
    viewBox="0 0 24 24"
    id="bubble1"
    class="absolute w-12 h-12 md:w-24 md:h-24"
  >
    <circle
      cx="6.5"
      cy="9.5"
      r="2.5"
      stroke-width="1"
      class="stroke-cyan-700"
    />
  </svg>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="800"
    height="800"
    fill="none"
    viewBox="0 0 24 24"
    id="bubble2"
    class="absolute w-12 h-12 md:w-24 md:h-24"
  >
    <circle
      cx="17"
      cy="8"
      r="4"
      stroke-width="1"
      class="stroke-cyan-700"
    />
  </svg>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="800"
    height="800"
    fill="none"
    viewBox="0 0 24 24"
    id="bubble3"
    class="absolute w-12 h-12 md:w-24 md:h-24"
  >
    <circle
      cx="12"
      cy="17"
      r="3"
      stroke-width="1"
      class="stroke-cyan-700"
    />
  </svg>
  <div
    id="shadow"
    class="hidden absolute bottom-0 left-4 w-16 h-3 md:block bg-zinc-200"
  />
</div>

<style>
  #bubble1 {
    animation: float 4s ease-in-out infinite 300ms;
  }
  #bubble2 {
    animation: float 4s ease-in-out infinite;
  }
  #bubble3 {
    animation: float 4s ease-in-out infinite 500ms;
  }

  #shadow {
    border-radius: 50%;
    animation: shadow 4s ease-in-out infinite;
  }

  @keyframes float {
    0% {
      transform: translatey(0px);
    }
    50% {
      transform: translatey(-10px);
    }
    100% {
      transform: translatey(0px);
    }
  }

  @keyframes shadow {
    0% {
      transform: scaleX(1);
    }
    50% {
      transform: scaleX(0.7);
    }
    100% {
      transform: scaleX(1);
    }
  }
</style>
