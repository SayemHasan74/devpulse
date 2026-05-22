import { QueryResultRow } from "pg";

export interface CountRow extends QueryResultRow {
  count: string;
}

export interface GroupCountRow extends QueryResultRow {
  name: string;
  count: string;
}
