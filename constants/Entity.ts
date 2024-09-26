interface Death {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  dateOfBirth: Date;
  dateOfDeath: Date;
  dateCreated: Date;
  dateUpdated?: Date | null; // optional
  causeOfDeath: string;
  nextOfKinName: string;
  nextOfKinRelationship: string;
  nextOfKinContact: string;
  status: Status;
  burialId: string;
  burial: Burial;
  visits: Visit[];
}

interface Burial {
  id: string;
  block: string;
  row: string;
  plotNumber: string;
  coordinates?: string | null; // Optional field
  isVacant: boolean;
  deaths: Death[]; // Array of Death objects
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
  death: Death; // Reference to a Death object
  deathId: string;
}

enum Status {
  ACTIVE,
  INACTIVE,
}

export { Burial, Death, Status, User, Visit };
