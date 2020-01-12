import React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";

import LayoutAuth from "./components/layouts/layout-auth/layout-auth.component";
import LayoutMain from "./components/layouts/layout-main/layout-main.component";
import { getSessionFromLocalStorage } from "./redux/session/session.actions";

interface IAppProps {
  getSessionFromLocalStorage: () => void;
}

class App extends React.Component<IAppProps> {
  componentDidMount() {
    this.props.getSessionFromLocalStorage();
  }
  render() {
    return (
      <div>
        <Switch>
          <Route path="/auth" component={LayoutAuth}></Route>
          <Route path="/" component={LayoutMain}></Route>
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = {
  getSessionFromLocalStorage: () => getSessionFromLocalStorage(),
};

export default connect(null, mapDispatchToProps)(App);
