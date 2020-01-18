import classnames from "classnames";
import React from "react";
import { useTranslation } from "react-i18next";

import getRoleNameByCode from "../../../lib/getRoleNameByCode";
import TeamRole from "../../../types/TeamRole";
import { ReactComponent as Oilrig } from "./oilrig.svg";
import { ReactComponent as Refinery } from "./refinery.svg";
import styles from "./team-role-selector.module.scss";

type Props = {
  /** Handle click event by user */
  handleClick: (role: TeamRole) => void;
  /** Is this instance selected. Currently not used */
  isSelected: boolean;
  /** Name of the team role */
  role: TeamRole;
};

/**
 * Selector for a team role
 *
 * @visibleName TeamRoleSelector
 */
const TeamRoleSelector: React.FC<Props> = ({ handleClick, isSelected, role }) => {
  // Role icon
  const image = role === TeamRole.Supplier ? <Oilrig /> : <Refinery />;
  const { t } = useTranslation();
  return (
    <div
      className={classnames(styles.selector, { [styles.selected]: isSelected })}
      onClick={() => handleClick(role)}
    >
      <div className={styles.img}>{image}</div>
      <div className={styles.caption}>{getRoleNameByCode(role, t)}</div>
    </div>
  );
};

export default TeamRoleSelector;
