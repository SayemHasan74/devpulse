import { Role } from "./common";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        name: string;
        role: Role;
      };
    }
  }
}
