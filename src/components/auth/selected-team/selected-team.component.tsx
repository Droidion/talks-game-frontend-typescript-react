import React from "react";
import { useTranslation } from "react-i18next";

import getRoleNameByCode from "../../../lib/getRoleNameByCode";
import TeamRole from "../../../types/TeamRole";
import styles from "./selected-team.module.scss";

type Props = {
  /** Name of the team role */
  number: number | undefined;
  /** Selected team number */
  role: TeamRole | undefined;
};

/**
 * Information about currently selected team number and role
 *
 * @visibleName SelectedTeam
 */
const SelectedTeam: React.FC<Props> = ({ role, number }) => {
  const { t } = useTranslation();
  const divNumber = number && (
    <div data-testid="selectedTeamNumber" className={styles.selectedTeamNumber}>
      {number}
    </div>
  );
  const divRole = role && (
    <div className={styles.selectedTeamRole}>{getRoleNameByCode(role, t)}</div>
  );

  return (
    <div className={styles.selectedTeam}>
      {divRole}
      {divNumber}
    </div>
  );
};

export default SelectedTeam;
