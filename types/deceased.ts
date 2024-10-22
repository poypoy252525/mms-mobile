type Deceased = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  ownerId: string;
  status: "ACTIVE" | "INACTIVE";
  burialId: string;
  burial: Burial | undefined;
  owner: Owner | undefined;
};
