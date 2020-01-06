import React from "react";

import styles from "./layout-auth.module.scss";
import Badge from "../badge/badge.component";

const LayoutAuth: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.badge}>
        <Badge />
      </div>
    </div>
  );
};

export default LayoutAuth;
