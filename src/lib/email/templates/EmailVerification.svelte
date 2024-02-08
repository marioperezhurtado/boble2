<script lang="ts">
  import { env } from "$env/dynamic/public";
  import { Hr, Text, Section, Link } from "svelte-email";
  import EmailLayout from "./EmailLayout.svelte";

  export let name: string;
  export let verificationCode: string;

  const text = {
    fontSize: "15px",
    fontWeight: "300",
    color: "#4b5563",
    lineHeight: "26px",
  };

  const code = {
    fontSize: "20px",
    fontWeight: "600",
    color: "#4b5563",
    lineHeight: "26px",
    backgroundColor: "#f3f4f6",
    borderRadius: "6px",
    padding: "10px 15px",
  };

  const hr = {
    borderColor: "#e4e4e7",
    margin: "30px 0 25px",
  };

  const anchor = {
    textDecoration: "underline",
    color: "#0891b2",
  };
</script>

<EmailLayout
  preview="Boble Web Chat - Verify your account"
  title="Verify your account"
>
  <Section>
    <Text style={text}>Hi, {name}!</Text>
    <Text style={text}>
      We&apos;re excited to have you on board. First, you need to confirm your
      email address. Your verification code is:
    </Text>

    <Text style={code}>{verificationCode}</Text>

    <Hr style={hr} />

    <Text style={text}>
      If you didn&apos;t request this, just ignore and delete this message.
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
