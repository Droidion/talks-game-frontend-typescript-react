import React from "react";

import { queryByTestId, render } from "@testing-library/react";

import GamePhase from "../../../types/GamePhase";
import PeriodIndicatorItem from "./period-indicator-item.component";

test("Renders future period indicator", () => {
  const { getByTestId, getByText } = render(
    <PeriodIndicatorItem
      isAnalysePhaseFilled={false}
      isPlayPhaseFilled={false}
      periodNumber={2}
    />
  );
  const front = getByTestId("front");
  const back = getByTestId("back");
  const numberText = getByText("2");
  const number = getByTestId("number");

  expect(back).toBeInTheDocument();
  expect(front).toBeInTheDocument();
  expect(numberText).toBeInTheDocument();
  expect(front.getAttribute("class")).not.toMatch(new RegExp("play"));
  expect(back.getAttribute("class")).not.toMatch(new RegExp("analyse"));
  expect(number.getAttribute("class")).toMatch(new RegExp("future"));
});

test("Renders past period indicator", () => {
  const { getByTestId, getByText } = render(
    <PeriodIndicatorItem
      isAnalysePhaseFilled={true}
      isPlayPhaseFilled={true}
      periodNumber={2}
    />
  );
  const front = getByTestId("front");
  const back = getByTestId("back");
  const number = getByTestId("number");

  expect(front.getAttribute("class")).toMatch(new RegExp("play"));
  expect(back.getAttribute("class")).toMatch(new RegExp("analyse"));
  expect(number.getAttribute("class")).not.toMatch(new RegExp("future"));
});
