import type { AuthRequest, AuthSession } from "lucia";

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      auth: AuthRequest;
      session: AuthSession;
    }
    // interface PageData {}
    // interface Platform {}
  }
  namespace Lucia {
    type Auth = import("$lib/server/lucia").Auth;
    type DatabaseUserAttributes = {
      name: string;
      email: string;
      emailVerified: number; // 0/1
      image: string | null;
      status: string | null;
      publicKey: string;
      encryptedSecret: string;
    };
    type DatabaseSessionAttributes = {};
  }
}

export { };
