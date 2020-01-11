import React from "react";

import { useRouteMatch, Route, Switch } from "react-router-dom";

import styles from "./layout-auth.module.scss";
import Badge from "../../badge/badge.component";
import PageSignin from "../../../pages/signin/page-signin.component";
import ChangeLanguage from "../../change-language/change-language.component";

const LayoutAuth: React.FC = () => {
  let match = useRouteMatch();
  return (
    <div className={styles.wrapper}>
      <div className={styles.badge}>
        <Badge />
      </div>
      <div className={styles.changeLanguage}>
        <ChangeLanguage />
      </div>
      <Switch>
        <Route exact path={`${match.url}/signin`}>
          <PageSignin />
        </Route>
      </Switch>
    </div>
  );
};

export default LayoutAuth;
