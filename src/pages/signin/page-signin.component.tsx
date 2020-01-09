import React from "react";
import { useTranslation } from "react-i18next";
import { connect, ConnectedProps } from "react-redux";
import { Redirect } from "react-router-dom";

import InputPassword from "../../components/input-password/input-password.component";
import { RootState } from "../../redux/root-reducer";
import { signIn } from "../../redux/session/session.actions";
import styles from "./page-signin.module.scss";

const PageSignin: React.FC<ConnectedProps<typeof connector>> = ({
  signIn,
  session,
}) => {
  const { t } = useTranslation();
  const handlePassword = (password: string) => {
    signIn("foo", password);
  };
  return session ? (
    <Redirect to="/" />
  ) : (
    <div className={styles.wrapper}>
      <h1>{t("Talks Planet")}</h1>
      <h2>{t("Business Simulation by TIM Group")}</h2>
      <div className={styles.separator}></div>
      <InputPassword handlePassword={handlePassword} />
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  session: state.session.session,
});

const mapDispatchToProps = {
  signIn: (login: string, password: string) => signIn(login, password),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(PageSignin);
