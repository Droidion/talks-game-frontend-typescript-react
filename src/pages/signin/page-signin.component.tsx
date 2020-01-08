import React from "react";
import { useTranslation } from "react-i18next";
import { connect, ConnectedProps } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";

import InputPassword from "../../components/input-password/input-password.component";
import { setSession } from "../../redux/session/session.actions";
import ISession from "../../types/ISession";
import styles from "./page-signin.module.scss";

const PageSignin: React.FC<ConnectedProps<typeof connector> &
  RouteComponentProps> = ({ setSession, history }) => {
  const { t } = useTranslation();
  const handlePassword = (password: string) => {
    setSession({
      token: password,
      team_number: 1,
      team_type: "foo",
      is_commander: false,
      created_at: "foo",
      updated_at: "foo",
    });
    history.push("/");
  };
  return (
    <div className={styles.wrapper}>
      <h1>{t("Talks Planet")}</h1>
      <h2>{t("Business Simulation by TIM Group")}</h2>
      <div className={styles.separator}></div>
      <InputPassword handlePassword={handlePassword} />
    </div>
  );
};

const mapDispatchToProps = {
  setSession: (session: ISession) => setSession(session),
};

const connector = connect(null, mapDispatchToProps);

export default withRouter(connector(PageSignin));
