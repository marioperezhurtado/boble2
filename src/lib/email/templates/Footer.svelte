<script lang="ts">
  import { Hr, Text } from "svelte-email";

  const currentYear = new Date().getFullYear();

  const footer = {
    color: "#71717a",
    fontSize: "12px",
    lineHeight: "10px",
  };

  const hr = {
    borderColor: "#e4e4e7",
    margin: "30px 0 25px",
  };
</script>

<Hr style={hr} />
<Text style={footer}>&copy;{currentYear} Boble</Text>
<Text style={footer}>Chat with friends and family from any device.</Text>
