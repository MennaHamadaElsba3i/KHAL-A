import { FragranceFamily } from "./product";

export interface FragranceFamilyCategory {
  id: string;
  name: FragranceFamily;
  slug: string;
  number: string; // e.g. "01", "02"
  subtitle: string;
  description: string;
  keyNotes: string;
  count: number;
}
