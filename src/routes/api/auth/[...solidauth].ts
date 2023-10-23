import { SolidAuth } from "@auth/solid-start"
import { authOptions } from "~/auth/auth"

export const { GET, POST } = SolidAuth(authOptions)
