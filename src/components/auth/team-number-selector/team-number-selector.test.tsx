import React from "react";

import { render, fireEvent } from "@testing-library/react";

import TeamNumberSelector from "./team-number-selector.component";

test("renders team number", () => {
  const { getByText } = render(
    <TeamNumberSelector handleClick={() => {}} isSelected={false} number={47} />
  );
  const teamNumber = getByText("47");
  expect(teamNumber).toBeInTheDocument();
});

test("submits team number on click", () => {
  let selectedNumber = 0;
  const handler = (number: number) => {
    selectedNumber = number;
  };
  const { getByText } = render(
    <TeamNumberSelector handleClick={handler} isSelected={false} number={47} />
  );
  const teamNumber = getByText("47");
  fireEvent.click(teamNumber);
  expect(selectedNumber).toEqual(47);
});
