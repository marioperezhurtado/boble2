<script lang="ts">
  import PasswordRequirementItem from "./PasswordRequirementItem.svelte";

  export let password: string;

  $: isLongEnough = password.length >= 8;
  $: hasUppercase = /[A-Z]/.test(password);
  $: hasLowercase = /[a-z]/.test(password);
  $: hasNumber = /\d/.test(password);
  $: hasSpecialCharacter = /[!@#$%^&*_(),.?":{}|<>]/.test(password);
</script>

<div>
  <p class="pt-2 pb-0.5 text-zinc-600">Password must:</p>
  <ul class="font-normal list-disc list-inside text-zinc-500">
    <PasswordRequirementItem
      text="Be at least 8 characters long"
      isFulfilled={isLongEnough}
    />
    <PasswordRequirementItem
      text="Contain at least one lowercase letter"
      isFulfilled={hasLowercase}
    />
    <PasswordRequirementItem
      text="Contain at least one uppercase letter"
      isFulfilled={hasUppercase}
    />
   <PasswordRequirementItem
      text="Contain at least one number"
      isFulfilled={hasNumber}
    />
    <PasswordRequirementItem
      text="Contain at least one special character"
      isFulfilled={hasSpecialCharacter}
    />
  </ul>
</div>
