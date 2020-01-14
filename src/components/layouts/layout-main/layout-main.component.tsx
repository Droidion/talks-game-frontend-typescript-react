import React from "react";

import ISessionState from "../../../types/ISessionState";
import ContentPanel from "../../content-panel/content-panel.component";
import Header from "../../header/header.component";
import LogoPanel from "../../logo-panel/logo-panel.component";
import styles from "./layout-main.module.scss";

/**
 * Layout for main game after authentication
 *
 * @visibleName LayoutMain
 */
const LayoutMain: React.FC<ISessionState> = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <LogoPanel />
      </div>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.menu}>menu</div>
      <div className={styles.content}>
        <ContentPanel />
      </div>
    </div>
  );
};

export default LayoutMain;
