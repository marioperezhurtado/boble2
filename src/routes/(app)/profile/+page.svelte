<script lang="ts">
  import Head from "$lib/ui/Head.svelte";
  import AppHeader from "../_components/AppHeader.svelte";
  import EditProfile from "./_components/EditProfile.svelte";
  import InviteMethods from "./_components/InviteMethods.svelte";

  export let data;
</script>

<Head 
  title="Your account | Boble Web Chat"
  description="Edit your profile details and connect with your friends."
/>

<AppHeader />

<main class="flex flex-col gap-x-8 gap-10 items-start py-8 px-4 mx-auto sm:py-10
md:px-8 lg:flex-row xl:gap-x-10 lg:pt-16 w-fit">
  <EditProfile />
  <InviteMethods userId={data.user.id} />
</main>
