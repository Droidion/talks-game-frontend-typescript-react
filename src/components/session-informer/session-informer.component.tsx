import React from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";

import { RootState } from "../../redux/root-reducer";
import ISessionState from "../../types/ISessionState";
import styles from "./session-informer.module.scss";

const SessionInformer: React.FC<ISessionState> = ({ session }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.wrapper}>
      <div>
        {t("Team")} {session?.team_number}
      </div>
      <div>
        {t("Token")} {session?.token}
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  session: state.session.session,
});

export default connect(mapStateToProps)(SessionInformer);
