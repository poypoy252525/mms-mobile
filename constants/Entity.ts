interface Deceased {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt?: Date | null; // optional
  status: Status;
  burialId: string;
  burial: Burial;
}

interface Burial {
  id: string;
  block: string;
  row: string;
  plotNumber: string;
  coordinates?: number[]; // Optional field
  isVacant: boolean;
  deaths: Deceased[]; // Array of Death objects
}

interface User {
  id: string;
  googleId: string;
  dateCreated: Date; // Date is represented in TypeScript as Date
  email: string;
  firstName: string;
  lastName: string;
  photo: string;
  visits: Visit[]; // Array of Visit objects
}

interface Visit {
  id: string;
  user: User; // Reference to a User object
  userId: string;
  death: Deceased; // Reference to a Death object
  deathId: string;
}

enum Status {
  ACTIVE,
  INACTIVE,
}

interface Point {
  type: string;
  coordinates: number[][];
}

interface Path {
  distance: number;
  weight: number;
  time: number;
  transfers: number;
  points_encoded: boolean;
  bbox: number[];
  points: GeoJSON.LineString;
  instructions: Instruction[];
}

export interface Instruction {
  distance: number;
  heading: number;
  sign: number;
  interval: number[];
  text: string;
  time: number;
  street_name: string;
}

export interface Directions {
  paths: Path[];
}

export { Burial, Deceased as Death, Status, User, Visit };
