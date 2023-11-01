<script lang="ts">
  import AppHeader from "../_components/AppHeader.svelte";
  import EditProfile from "./_components/EditProfile.svelte";
  import FriendRequests from "./_components/FriendRequests.svelte";
</script>

<AppHeader />
<main
  class="flex flex-col gap-14 justify-center items-center px-4 pt-10 sm:pt-20 lg:flex-row lg:gap-10 lg:items-start"
>
  <EditProfile />
  <FriendRequests />
</main>
