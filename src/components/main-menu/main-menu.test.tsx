import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { render } from "@testing-library/react";

import store from "../../redux/store";
import MainMenu from "./main-menu.component";

test("renders several links", () => {
  const { container } = render(
    <Provider store={store}>
      <BrowserRouter>
        <MainMenu />
      </BrowserRouter>
    </Provider>
  );
  const links = document.getElementsByTagName("a");
  expect(links.length).toBe(6);
});
