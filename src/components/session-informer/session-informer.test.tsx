import React from "react";

import { Provider } from "react-redux";
import { render } from "@testing-library/react";

import SessionInformer from "./session-informer.component";
import { BrowserRouter } from "react-router-dom";
import store from "../../redux/store";

test("renders name and link", () => {
  const { container } = render(
    <Provider store={store}>
      <BrowserRouter>
        <SessionInformer />
      </BrowserRouter>
    </Provider>
  );
  expect(container).toBeInTheDocument();
});
