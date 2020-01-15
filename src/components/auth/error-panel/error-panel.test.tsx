import React from "react";

import { render } from "@testing-library/react";

import ErrorPanel from "./error-panel.component";

test("error panel has text", () => {
  const { getByText } = render(<ErrorPanel text={"Nasty error"} />);
  const panel = getByText("Nasty error");
  expect(panel).toBeInTheDocument();
});
