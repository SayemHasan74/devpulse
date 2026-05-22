import { query } from "../../config/db";
import { Role } from "../../types/common";
import { PublicUser, UserRow } from "./auth.types";

export const findUserByEmail = async (email: string) => {
  const result = await query<UserRow>(
    "SELECT id, name, email, password, role, created_at, updated_at FROM users WHERE email = $1",
    [email]
  );

  return result.rows[0];
};

export const createUser = async (
  name: string,
  email: string,
  password: string,
  role: Role
) => {
  const result = await query<PublicUser>(
    `INSERT INTO users (name, email, password, role)
     VALUES ($1, $2, $3, $4)
     RETURNING id, name, email, role, created_at, updated_at`,
    [name, email, password, role]
  );

  return result.rows[0];
};
