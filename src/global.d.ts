/// <reference types="solid-start/env" />

import { DefaultSession } from "@auth/core/types"

declare module "@auth/core/types" {
  export interface Session {
    id: string,
    user: DefaultSession["user"],
  }
}
