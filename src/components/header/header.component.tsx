import React from "react";

import styles from "./header.module.scss";
import SessionInformer from "../session-informer/session-informer.component";

const Header: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <SessionInformer />
    </div>
  );
};

export default Header;
