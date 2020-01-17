import React from "react";
import { useTranslation } from "react-i18next";
import { connect, ConnectedProps } from "react-redux";
import { Redirect } from "react-router-dom";

import { RootState } from "../../redux/root-reducer";
import { signOut } from "../../redux/session/session.actions";
import styles from "./session-informer.module.scss";

const SessionInformer: React.FC<ConnectedProps<typeof connector>> = ({
  session,
  signOut,
}) => {
  const { t } = useTranslation();
  return session ? (
    <div className={styles.wrapper}>
      <div>
        {t("Team")} {session.teamNumber}, {t("Token")} {session.token}
      </div>
      <button data-testid={"signOutButton"} onClick={() => signOut(session.token)}>
        {t("Sign out")}
      </button>
    </div>
  ) : (
    <Redirect to="/auth/signin" />
  );
};

const mapStateToProps = (state: RootState) => ({
  session: state.session.session,
});

const mapDispatchToProps = {
  signOut: (token: string) => signOut(token),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

/**
 * Information about signed in user
 *
 * @visibleName SessionInformer
 */
export default connector(SessionInformer);
