import React from "react";
import { connect } from "react-redux";

import styles from "./layout-main.module.scss";
import { RootState } from "../../redux/root-reducer";
import LogoPanel from "../logo-panel/logo-panel.component";
import Header from "../header/header.component";
import ISessionState from "../../types/ISessionState";

const LayoutMain: React.FC<ISessionState> = ({ session }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <LogoPanel />
      </div>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.menu}>menu</div>
      <div className={styles.content}>content</div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  session: state.session.session,
});

export default connect(mapStateToProps)(LayoutMain);
