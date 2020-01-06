import React from "react";

import styles from "./badge.module.scss";
import { ReactComponent as BadgeSvg } from "./badge.svg";

const Badge: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <BadgeSvg />
    </div>
  );
};

export default Badge;
