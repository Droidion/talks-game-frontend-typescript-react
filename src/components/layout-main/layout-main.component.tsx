import React from "react";
import { connect } from "react-redux";

import styles from "./layout-main.module.scss";
import { RootState } from "../../redux/root-reducer";
import ISessionState from "../../types/ISessionState";

const LayoutMain: React.FC<ISessionState> = ({ session }) => {
  return (
    <div className={styles.wrapper}>
      <h1>Main Layout</h1>
      <div>Token: {session?.token}</div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  session: state.session.session,
});

export default connect(mapStateToProps)(LayoutMain);
