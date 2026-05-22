import { query } from "../../config/db";
import { CountRow, GroupCountRow } from "./metrics.types";

export const countUsers = async () => {
  const result = await query<CountRow>("SELECT COUNT(*) AS count FROM users");
  return Number(result.rows[0].count);
};

export const countIssues = async () => {
  const result = await query<CountRow>("SELECT COUNT(*) AS count FROM issues");
  return Number(result.rows[0].count);
};

export const countIssuesByStatus = async () => {
  const result = await query<GroupCountRow>(
    "SELECT status AS name, COUNT(*) AS count FROM issues GROUP BY status"
  );

  return result.rows;
};

export const countIssuesByType = async () => {
  const result = await query<GroupCountRow>(
    "SELECT type AS name, COUNT(*) AS count FROM issues GROUP BY type"
  );

  return result.rows;
};
