import GitHub from "@auth/core/providers/github"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "~/db/db"
import { getSession, SolidAuthConfig } from "@auth/solid-start"

export const authOptions: SolidAuthConfig = {
  adapter: DrizzleAdapter(db),
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    session({ session, user }) {
      return {
        ...session,
        id: user.id,
      }
    },
  },
  debug: false,
}

export function getServerSession(req: Request) {
  return getSession(req, authOptions)
}
