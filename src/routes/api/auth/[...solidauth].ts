// routes/api/auth/[...solidauth].ts
import { SolidAuth, type SolidAuthConfig } from "@auth/solid-start"
import GitHub from "@auth/core/providers/github"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "~/db/db"

export const authOpts: SolidAuthConfig = {
  adapter: DrizzleAdapter(db),
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  debug: false,
}

export const { GET, POST } = SolidAuth(authOpts)
