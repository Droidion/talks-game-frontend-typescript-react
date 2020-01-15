import React from "react";

import { render } from "@testing-library/react";

import Badge from "./badge.component";

test("Renders something", () => {
  const { container } = render(<Badge />);
  expect(container).toBeInTheDocument();
});
