import { TFunction } from "i18next";

import TeamRole from "../types/TeamRole";
import capitalizeFirstLetter from "./capitalizeFirstLetter";

/** Get human readable role name by its code */
const getRoleNameByCode = (role: TeamRole, t: TFunction) =>
  t(capitalizeFirstLetter(role));

export default getRoleNameByCode;
