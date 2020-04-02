import React from "react";

import { render } from "@testing-library/react";

import Slider from "./slider.component";

test("Renders slider", () => {
  const { getByTestId } = render(
    <Slider
      defaultValue={100}
      maxValue={10000}
      minValue={0}
      handleChange={(x) => x}
    />
  );
  const slider = getByTestId("slider");
  expect(slider).toBeInTheDocument();
});
