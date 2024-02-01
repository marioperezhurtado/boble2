<script lang="ts">
  import { env } from "$env/dynamic/public";
  import { Section, Text, Link, Button, Hr } from "svelte-email";
  import EmailLayout from "./EmailLayout.svelte";

  const text = {
    fontSize: "15px",
    fontWeight: "300",
    color: "#4b5563",
    lineHeight: "26px",
  };

  const button = {
    backgroundColor: "#0891b2",
    borderRadius: "4px",
    color: "#fff",
    fontSize: "15px",
    textDecoration: "none",
    textAlign: "center",
    fontWeight: "600",
    display: "block",
    width: "210px",
    padding: "14px 7px",
  };

  const hr = {
    borderColor: "#e4e4e7",
    margin: "30px 0 25px",
  };

  const anchor = {
    textDecoration: "underline",
    color: "#0891b2",
  };

  export let name: string;
  export let resetUrl: string;
</script>

<EmailLayout preview="Boble Web Chat - Reset your password" title="Reset your password">
  <Section>
    <Text style={text}>Hi {name},</Text>
    <Text style={text}>
      Someone recently requested a password change for your Boble account. If
      this was you, you can set a new password here:
    </Text>
    <Button style={button} href={resetUrl}>Reset password</Button>
    <Hr style={hr} />
    <Text style={text}>
      If you don&apos;t want to change your password or didn&apos;t request
      this, just ignore and delete this message.
    </Text>
    <Text style={text}>
      To keep your account secure, please don&apos;t forward this email to
      anyone. If you need help, please
      <Link style={anchor} href={`${env.PUBLIC_SITE_URL}/support`}>
        contact support.
      </Link>
    </Text>
  </Section>
</EmailLayout>
