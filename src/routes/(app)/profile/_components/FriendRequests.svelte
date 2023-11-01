<script lang="ts">
  import Label from "$lib/ui/Label.svelte";
  import Input from "$lib/ui/Input.svelte";
  import Button from "$lib/ui/Button.svelte";
</script>

<section
  class="flex flex-col justify-center p-6 w-full max-w-lg bg-white
  rounded-md border shadow-md"
>
  <h1 class="pb-3 text-xl font-bold">Connect with your friends</h1>
  <div class="flex flex-col gap-1 text-sm text-zinc-500">
    <p>You can send friend requests to other users to chat with them.</p>
    <p>Send a friend request with their email address.</p>
  </div>

  <form class="flex flex-col gap-3 pt-8">
    <Label for="email">
      Email address
      <div class="flex gap-2 items-center">
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="your-friend@email.com"
        />
        <Button type="submit" size="small" class="flex-grow min-w-fit w-full">
          Send friend request
        </Button>
      </div>
    </Label>
  </form>
</section>
