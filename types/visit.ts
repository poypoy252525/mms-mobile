import { Death } from "@/constants/Entity";

export interface Visit {
  id: string;
  userId: string;
  deathId: string;
  death: Death;
}
