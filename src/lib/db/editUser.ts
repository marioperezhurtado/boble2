import { db } from "$lib/db/db";
import { eq } from "drizzle-orm";
import { user } from "./schema";

type EditUserParams = {
  name: string;
  status: string;
  id: string;
};

export function editUser({ name, status, id }: EditUserParams) {
  return db.update(user)
    .set({
      name,
      status,
    })
    .where(eq(user.id, id));
}
