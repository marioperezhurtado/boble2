<script lang="ts">
  import AppHeader from "../_components/AppHeader.svelte";
  import EditProfile from "./_components/EditProfile.svelte";
  import InviteMethods from "./_components/InviteMethods.svelte";

  export let data;
</script>

<AppHeader />
<main class="flex flex-col gap-10 py-8 px-4 mx-auto sm:py-10 lg:pt-16 w-fit">
  <EditProfile />
  <InviteMethods userId={data.user.id} />
</main>
