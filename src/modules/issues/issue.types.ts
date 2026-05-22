import { QueryResultRow } from "pg";

import { IssueStatus, IssueType, Role } from "../../types/common";

export interface IssueRow extends QueryResultRow {
  id: number;
  title: string;
  description: string;
  type: IssueType;
  status: IssueStatus;
  reporter_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface ReporterRow extends QueryResultRow {
  id: number;
  name: string;
  role: Role;
}

export interface IssueWithReporter {
  id: number;
  title: string;
  description: string;
  type: IssueType;
  status: IssueStatus;
  reporter: ReporterRow | null;
  created_at: Date;
  updated_at: Date;
}
