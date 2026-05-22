import { QueryResultRow } from "pg";

import { Role } from "../../types/common";

export interface UserRow extends QueryResultRow {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Role;
  created_at: Date;
  updated_at: Date;
}

export interface PublicUser extends QueryResultRow {
  id: number;
  name: string;
  email: string;
  role: Role;
  created_at: Date;
  updated_at: Date;
}
