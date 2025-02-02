import { createTRPCRouter } from "$lib/trpc/server/trpc";
import { blockUser } from "./blockUser";
import { unblockUser } from "./unblockUser";
import { editUser } from "./editUser";

export const userRouter = createTRPCRouter({
  block: blockUser,
  unblock: unblockUser,
  edit: editUser,
});
