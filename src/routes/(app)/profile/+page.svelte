<script lang="ts">
  import AppHeader from "../_components/AppHeader.svelte";
  import EditProfile from "./_components/EditProfile.svelte";
  import InviteMethods from "./_components/InviteMethods.svelte";

  export let data;
</script>

<AppHeader />
<main class="flex flex-col gap-10 px-4 pt-10 mx-auto lg:pt-16 w-fit">
  <EditProfile />
  <InviteMethods userId={data.user.id} />
</main>
