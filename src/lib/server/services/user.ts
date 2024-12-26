import { eq } from "drizzle-orm";
import db from "../db";
import { InsertUserDTO, users, userSettings } from "../schemas";

export type DBUser = NonNullable<Awaited<ReturnType<typeof getUserById>>>;

export const getUserById = async (id: string) => {
  return db.query.users.findFirst({
    where: eq(users.id, id),
    with: {
      setting: true,
    },
  });
};

export const loginUser = async (userId: string) => {
  await db.insert(userSettings).values({ userId });
  return getUserById(userId);
};

export const registerUser = async (dto: InsertUserDTO) => {
  await db.transaction(async (tx) => {
    const userIds = await tx
      .insert(users)
      .values(dto)
      .returning({ userId: users.id });
    await tx.insert(userSettings).values({ userId: userIds[0].userId });
  });
};
