import React from "react";
import { Route, Switch } from "react-router-dom";

import LayoutAuth from "./components/layouts/layout-auth/layout-auth.component";
import LayoutMain from "./components/layouts/layout-main/layout-main.component";

const App: React.FC = () => {
  return (
    <div>
      <Switch>
        <Route path="/auth" component={LayoutAuth}></Route>
        <Route path="/" component={LayoutMain}></Route>
      </Switch>
    </div>
  );
};

export default App;
