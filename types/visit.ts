import { Death } from "@prisma/client";

export interface Visit {
  id: string;
  userId: string;
  deathId: string;
  death: Death;
}
