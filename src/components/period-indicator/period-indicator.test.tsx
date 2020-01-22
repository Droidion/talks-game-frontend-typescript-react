import React from "react";

import { render } from "@testing-library/react";

import GamePhase from "../../types/GamePhase";
import PeriodIndicator from "./period-indicator.component";

test("Renders three items into period indicator with different styles", () => {
  const { getAllByTestId, queryAllByTestId } = render(
    <PeriodIndicator periods={3} currentPeriod={2} phaseType={GamePhase.Play} />
  );
  const periodIndicatorItemNumber = queryAllByTestId("periodIndicatorItem");
  const pastPeriodFront = getAllByTestId("front")[0];
  const pastPeriodBack = getAllByTestId("back")[0];
  const pastPeriodNumber = getAllByTestId("number")[0];
  const futurePeriodFront = getAllByTestId("front")[2];
  const futurePeriodBack = getAllByTestId("back")[2];
  const futurePeriodNumber = getAllByTestId("number")[2];

  expect(periodIndicatorItemNumber).toHaveLength(3);

  expect(pastPeriodFront.getAttribute("class")).toMatch(new RegExp("play"));
  expect(pastPeriodBack.getAttribute("class")).toMatch(new RegExp("analyse"));
  expect(pastPeriodNumber.getAttribute("class")).not.toMatch(new RegExp("future"));

  expect(futurePeriodFront.getAttribute("class")).not.toMatch(new RegExp("play"));
  expect(futurePeriodBack.getAttribute("class")).not.toMatch(new RegExp("analyse"));
  expect(futurePeriodNumber.getAttribute("class")).toMatch(new RegExp("future"));
});
