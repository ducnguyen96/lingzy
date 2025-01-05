import { eq } from "drizzle-orm";
import db from "../db";
import {
  InsertUserDTO,
  UpdateUserSettingDTO,
  users,
  settings,
} from "../schemas";

type User = NonNullable<Awaited<ReturnType<typeof getUserById>>>;
export type DBUser = Omit<User, "setting"> & {
  setting: NonNullable<User["setting"]>;
};

export const getUserById = async (id: string) => {
  return db.query.users.findFirst({
    where: eq(users.id, id),
    with: {
      setting: true,
    },
  });
};

export const getUserByEmail = async (email: string) => {
  return db.query.users.findFirst({
    where: eq(users.email, email),
    with: {
      setting: true,
    },
  });
};

export const loginUser = async (userId: string) => {
  const found = await getUserById(userId);
  if (found?.setting) return found;
  await db.insert(settings).values({ userId });
  return getUserById(userId);
};

export const registerUser = async (dto: InsertUserDTO) => {
  await db.transaction(async (tx) => {
    const userIds = await tx
      .insert(users)
      .values(dto)
      .returning({ userId: users.id });
    await tx.insert(settings).values({ userId: userIds[0].userId });
  });
};

export const updateUserSetting = async (
  user: DBUser,
  dto: UpdateUserSettingDTO,
) => {
  await db.update(settings).set(dto).where(eq(settings.userId, user.id));
};
