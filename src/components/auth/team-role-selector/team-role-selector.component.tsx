import classnames from "classnames";
import React from "react";
import { useTranslation } from "react-i18next";

import { ReactComponent as Oilrig } from "./oilrig.svg";
import { ReactComponent as Refinery } from "./refinery.svg";
import styles from "./team-role-selector.module.scss";

type TeamRoleSelectorProps = {
  handleClick: (role: string) => void;
  isSelected: boolean;
  role: string;
};

const TeamRoleSelector: React.FC<TeamRoleSelectorProps> = ({
  handleClick,
  isSelected,
  role,
}) => {
  const image = role === "supplier" ? <Oilrig /> : <Refinery />;
  const { t } = useTranslation();
  const roleName = (roleCode: string) => {
    switch (roleCode) {
      case "supplier":
        return t("Supplier");
      default:
        return t("Consumer");
    }
  };
  return (
    <div
      className={classnames(styles.selector, { [styles.selected]: isSelected })}
      onClick={() => handleClick(role)}
    >
      <div className={styles.img}>{image}</div>
      <div className={styles.caption}>{roleName(role)}</div>
    </div>
  );
};

export default TeamRoleSelector;