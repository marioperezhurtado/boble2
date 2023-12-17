<div class="relative mt-3 -ml-3 w-20 sm:w-24">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="800"
    height="800"
    fill="none"
    viewBox="0 0 24 24"
    id="bubble1"
    class="absolute w-20 h-20 sm:w-24 sm:h-24"
  >
    <circle
      cx="6.5"
      cy="9.5"
      r="2.5"
      stroke-width="1.8"
      class="stroke-cyan-600"
    />
  </svg>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="800"
    height="800"
    fill="none"
    viewBox="0 0 24 24"
    id="bubble2"
    class="absolute w-20 h-20 sm:w-24 sm:h-24"
  >
    <circle
      cx="17"
      cy="8"
      r="4"
      stroke-width="1.8"
      class="stroke-cyan-600"
    />
  </svg>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="800"
    height="800"
    fill="none"
    viewBox="0 0 24 24"
    id="bubble3"
    class="absolute w-20 h-20 sm:w-24 sm:h-24"
  >
    <circle
      cx="12"
      cy="17"
      r="3"
      stroke-width="1.8"
      class="stroke-cyan-600"
    />
  </svg>
  <div
    id="shadow"
    class="absolute bottom-0 left-3 w-14 h-3 sm:left-4 sm:w-16 bg-zinc-200"
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
