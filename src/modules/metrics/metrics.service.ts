import {
  countIssues,
  countIssuesByStatus,
  countIssuesByType,
  countUsers,
} from "./metrics.repository";

const toCountMap = (rows: { name: string; count: string }[]) => {
  return rows.reduce<Record<string, number>>((result, row) => {
    result[row.name] = Number(row.count);
    return result;
  }, {});
};

export const getMetrics = async () => {
  const [totalUsers, totalIssues, statusRows, typeRows] = await Promise.all([
    countUsers(),
    countIssues(),
    countIssuesByStatus(),
    countIssuesByType(),
  ]);

  return {
    total_users: totalUsers,
    total_issues: totalIssues,
    issues_by_status: toCountMap(statusRows),
    issues_by_type: toCountMap(typeRows),
  };
};
