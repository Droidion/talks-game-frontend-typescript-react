import React from "react";

import { render } from "@testing-library/react";

import ContentPanel from "./content-panel.component";

test("Renders component container", () => {
  const { container } = render(<ContentPanel />);
  expect(container).toBeInTheDocument();
});
