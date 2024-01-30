import { db } from "$lib/db/db";
import { user } from "$lib/db/schema";
import { eq } from "drizzle-orm";

type EditUserParams = {
  id: string;
  name: string;
  status: string | null;
};

export function editUser({ id, name, status }: EditUserParams) {
  return db.update(user)
    .set({
      name,
      status,
    })
    .where(eq(user.id, id));
}
