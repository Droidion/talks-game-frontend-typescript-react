import React from "react";

import { render, queryByText } from "@testing-library/react";

import SelectedTeam from "./selected-team.component";

test("Renders team role and does not render team number", () => {
  const { getByText, queryByText } = render(<SelectedTeam role={"supplier"} number={0}/>);
  const teamNumber = queryByText("0");
  const teamRole = getByText("Supplier");

  expect(teamNumber).not.toBeInTheDocument(); 
  expect(teamRole).toBeInTheDocument();
});

test("Renders team role and team number", () => {
  const { getByText } = render(<SelectedTeam role={"supplier"} number={5}/>);
  const teamNumber = getByText("5");
  const teamRole = getByText("Supplier");

  expect(teamNumber).toBeInTheDocument();
  expect(teamRole).toBeInTheDocument();
});
