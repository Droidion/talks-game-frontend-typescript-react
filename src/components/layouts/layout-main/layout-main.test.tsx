import React from "react";

import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../../redux/store";
import { BrowserRouter } from "react-router-dom";

import LayoutMain from "./layout-main.component";

test("Renders component container", () => {
  const { container } = render(
    <Provider store={store}>
      <BrowserRouter>
        <LayoutMain />
      </BrowserRouter>
    </Provider>
  );
  expect(container).toBeInTheDocument();
});
