type Burial = {
  id: string;
  block: string;
  row: string;
  coordinates: number[];
  isVacant: boolean;
  type: BurialType;
  ownerId: string;
};

type BurialType = {
  FAMILY_LOT: "FAMILY_LOT";
  LAWN_LOT: "LAWN_LOT";
  APARTMENT: "APARTMENT";
  COLUMBARIUM: "COLUMBARIUM";
};