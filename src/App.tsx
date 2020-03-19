import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Route, Switch } from "react-router-dom";

import LayoutAuth from "./components/layouts/layout-auth/layout-auth.component";
import LayoutMain from "./components/layouts/layout-main/layout-main.component";
import { getSessionFromLocalStorage } from "./redux/session/session.actions";

const App: React.FC<ConnectedProps<typeof connector>> = (props) => {
  useEffect(() => {
    props.getSessionFromLocalStorage();
  });

  return (
    <div>
      <Switch>
        <Route path="/auth" component={LayoutAuth}></Route>
        <Route path="/" component={LayoutMain}></Route>
      </Switch>
    </div>
  );
};

const mapDispatchToProps = {
  getSessionFromLocalStorage: () => getSessionFromLocalStorage(),
};

const connector = connect(null, mapDispatchToProps);

export default connector(App);
