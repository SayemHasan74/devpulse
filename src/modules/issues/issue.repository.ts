import { query } from "../../config/db";
import { IssueStatus, IssueType } from "../../types/common";
import { IssueRow, ReporterRow } from "./issue.types";

export const createIssue = async (
  title: string,
  description: string,
  type: IssueType,
  reporterId: number
) => {
  const result = await query<IssueRow>(
    `INSERT INTO issues (title, description, type, reporter_id)
     VALUES ($1, $2, $3, $4)
     RETURNING id, title, description, type, status, reporter_id, created_at, updated_at`,
    [title, description, type, reporterId]
  );

  return result.rows[0];
};

export const findIssues = async (
  sort: "newest" | "oldest",
  type?: IssueType,
  status?: IssueStatus
) => {
  const values: unknown[] = [];
  const conditions: string[] = [];

  if (type) {
    values.push(type);
    conditions.push(`type = $${values.length}`);
  }

  if (status) {
    values.push(status);
    conditions.push(`status = $${values.length}`);
  }

  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
  const order = sort === "oldest" ? "ASC" : "DESC";

  const result = await query<IssueRow>(
    `SELECT id, title, description, type, status, reporter_id, created_at, updated_at
     FROM issues
     ${where}
     ORDER BY created_at ${order}`,
    values
  );

  return result.rows;
};

export const findIssueById = async (id: number) => {
  const result = await query<IssueRow>(
    `SELECT id, title, description, type, status, reporter_id, created_at, updated_at
     FROM issues
     WHERE id = $1`,
    [id]
  );

  return result.rows[0];
};

export const findReportersByIds = async (ids: number[]) => {
  if (!ids.length) {
    return [];
  }

  const result = await query<ReporterRow>(
    "SELECT id, name, role FROM users WHERE id = ANY($1::int[])",
    [ids]
  );

  return result.rows;
};

export const updateIssue = async (
  id: number,
  title: string,
  description: string,
  type: IssueType,
  status?: IssueStatus
) => {
  const values: unknown[] = [title, description, type, id];

  if (status) {
    values.push(status);
    const result = await query<IssueRow>(
      `UPDATE issues
       SET title = $1, description = $2, type = $3, status = $5
       WHERE id = $4
       RETURNING id, title, description, type, status, reporter_id, created_at, updated_at`,
      values
    );

    return result.rows[0];
  }

  const result = await query<IssueRow>(
    `UPDATE issues
     SET title = $1, description = $2, type = $3
     WHERE id = $4
     RETURNING id, title, description, type, status, reporter_id, created_at, updated_at`,
    values
  );

  return result.rows[0];
};

export const deleteIssue = async (id: number) => {
  const result = await query<IssueRow>(
    `DELETE FROM issues
     WHERE id = $1
     RETURNING id, title, description, type, status, reporter_id, created_at, updated_at`,
    [id]
  );

  return result.rows[0];
};
