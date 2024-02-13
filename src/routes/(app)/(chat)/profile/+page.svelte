<script lang="ts">
  import AppHeader from "$lib/ui/AppHeader.svelte";
  import Head from "$lib/ui/Head.svelte";
  import EditProfile from "./_components/EditProfile.svelte";
  import InviteMethods from "./_components/InviteMethods.svelte";

  export let data;
</script>

<Head
  title="Your account | Boble Web Chat"
  description="Edit your profile details and connect with your friends."
/>

<AppHeader user={data.user} />

<main
  class="flex flex-col gap-x-8 gap-10 items-start py-8 px-4 mx-auto sm:py-10 md:px-8 lg:flex-row lg:pt-16 xl:gap-x-10 w-fit"
>
  <EditProfile />
  <InviteMethods userId={data.user.id} />
</main>
