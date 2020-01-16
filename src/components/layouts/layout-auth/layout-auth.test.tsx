import React from "react";

import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../../redux/store";
import { BrowserRouter } from "react-router-dom";

import LayoutAuth from "./layout-auth.component";

test("Renders component container", () => {
  const { container } = render(
    <Provider store={store}>
      <BrowserRouter>
        <LayoutAuth />
      </BrowserRouter>
    </Provider>
  );
  expect(container).toBeInTheDocument();
});
