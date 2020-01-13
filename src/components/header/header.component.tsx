import React from "react";

import SessionInformer from "../session-informer/session-informer.component";
import styles from "./header.module.scss";

/**
 * Header block on main layout
 *
 * @visibleName Header
 */
const Header: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <SessionInformer />
    </div>
  );
};

export default Header;
