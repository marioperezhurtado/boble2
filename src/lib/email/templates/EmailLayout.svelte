<script lang="ts">
  import { Html, Preview, Body, Heading, Container } from "svelte-email";
  import Footer from "./Footer.svelte";

  export let preview: string;
  export let title: string;

  const main = {
    backgroundColor: "#f4f4f5",
    padding: "10px 0",
  };

  const container = {
    backgroundColor: "#fff",
    border: "1px solid #e4e4e7",
    padding: "45px",
    borderRadius: "6px",
    margin: "10px auto",
  };

  const heading = {
    fontSize: "20px",
    fontWeight: "700",
    color: "#3f3f46",
    lineHeight: "26px",
    margin: "0 0 15px",
  };
</script>

<Html>
  <Preview {preview} />
  <Body style={main}>
    <Container style={container}>
      <Heading style={heading}>{title}</Heading>
      <slot />
      <Footer />
    </Container>
  </Body>
</Html>
