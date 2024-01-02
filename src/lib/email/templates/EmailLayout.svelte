<script lang="ts">
  import { PUBLIC_SITE_URL } from "$env/static/public";
  import { Html, Preview, Body, Heading, Container, Img } from "svelte-email";
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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="33"
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle cx="17" cy="8" r="4" stroke="#0e7490" stroke-width="2" />
        <circle cx="12" cy="17" r="3" stroke="#0e7490" stroke-width="2" />
        <circle cx="6.5" cy="9.5" r="2.5" stroke="#0e7490" stroke-width="2" />
      </svg>
      <Heading style={heading}>{title}</Heading>
      <slot />
      <Footer />
    </Container>
  </Body>
</Html>
