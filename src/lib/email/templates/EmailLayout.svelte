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
      <Img
        src={`${PUBLIC_SITE_URL}/boble.svg`}
        width="40"
        height="33"
        style={{ margin: "0 0 30px 0" }}
        alt="BOBLE"
      />
      <Heading style={heading}>{title}</Heading>
      <slot />
      <Footer />
    </Container>
  </Body>
</Html>
