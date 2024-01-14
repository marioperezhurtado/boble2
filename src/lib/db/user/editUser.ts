import { db } from "$lib/db/db";
import { user } from "$lib/db/schema";
import { eq } from "drizzle-orm";

type EditUserParams = {
  name: string;
  status: string | null;
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
