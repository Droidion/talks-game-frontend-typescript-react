import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { render } from "@testing-library/react";

import App from "./App";
import store from "./redux/store";

test("renders learn react link", () => {
  const { container } = render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
  const el = container.querySelector("div");
  expect(el).toBeInTheDocument();
});
