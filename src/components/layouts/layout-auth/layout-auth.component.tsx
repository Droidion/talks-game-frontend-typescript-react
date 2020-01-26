import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

import PageSignin from "../../../pages/signin/page-signin.component";
import Badge from "../../badge/badge.component";
import ChangeLanguage from "../../change-language/change-language.component";
import styles from "./layout-auth.module.scss";

/**
 * Layout for authentication
 *
 * @visibleName LayoutAuth
 */
const LayoutAuth: React.FC = () => {
  const match = useRouteMatch();
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
