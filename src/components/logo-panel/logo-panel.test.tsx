import React from "react";

import { render } from "@testing-library/react";

import LogoPanel from "./logo-panel.component";

test("renders name and link", () => {
  const { getByText } = render(<LogoPanel />);
  const name = getByText("Talks Planet");
  const site = getByText("timseminar.ru");
  expect(name).toBeInTheDocument();
  expect(site).toBeInTheDocument();
});
