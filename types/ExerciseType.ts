import {
  Muscle,
  ForceType,
  LevelType,
  MechanicType,
  EquipmentType,
  CategoryType,
} from "@prisma/client";

export type Exercise = {
  id: string;
  name: string;
  aliases: string[];
  primary_muscles: Muscle[];
  secondary_muscles: Muscle[];
  force: ForceType | null;
  level: LevelType;
  mechanic: MechanicType | null;
  equipment: EquipmentType | null;
  category: CategoryType;
  instructions: string[];
  tips: string[];
  image: string | null;
};
