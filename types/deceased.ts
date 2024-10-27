type Deceased = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  status: "ACTIVE" | "INACTIVE";
  burialId: string;
  burial: Burial | undefined;
};
