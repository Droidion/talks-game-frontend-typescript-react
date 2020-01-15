import React from "react";

import { render } from "@testing-library/react";

import ChangeLanguage from "./change-language.component";

test("Renders RU and EN selector", () => {
  const { getByText } = render(<ChangeLanguage />);
  const ru = getByText("RU");
  const en = getByText("EN");
  expect(ru).toBeInTheDocument();
  expect(en).toBeInTheDocument();
});
