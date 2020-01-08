import React from "react";
import { useTranslation } from "react-i18next";
import { connect, ConnectedProps } from "react-redux";
import { Redirect } from "react-router-dom";

import { RootState } from "../../redux/root-reducer";
import { emptySession } from "../../redux/session/session.actions";
import styles from "./session-informer.module.scss";

const SessionInformer: React.FC<ConnectedProps<typeof connector>> = ({
  session,
  emptySession,
}) => {
  const { t } = useTranslation();
  return session ? (
    <div className={styles.wrapper}>
      <div>
        {t("Team")} {session.team_number}, {t("Token")} {session.token}
      </div>
      <button onClick={emptySession}>{t("Sign out")}</button>
    </div>
  ) : (
    <Redirect to="/auth/signin" />
  );
};

const mapStateToProps = (state: RootState) => ({
  session: state.session.session,
});

const mapDispatchToProps = {
  emptySession: () => emptySession(),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(SessionInformer);
