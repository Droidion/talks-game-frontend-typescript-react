import React from "react";

import { render, queryByTestId } from "@testing-library/react";

import SelectedTeam from "./selected-team.component";
import TeamRole from "../../../types/TeamRole";

test("Renders team role and does not render team number", () => {
  const { getByText, queryByTestId } = render(
    <SelectedTeam role={TeamRole.Supplier} number={0} />
  );
  const teamNumber = queryByTestId("selectedTeamNumber");
  const teamRole = getByText("Supplier");

  expect(teamNumber).not.toBeInTheDocument();
  expect(teamRole).toBeInTheDocument();
});

test("Renders team role and team number", () => {
  const { getByText } = render(<SelectedTeam role={TeamRole.Supplier} number={5} />);
  const teamNumber = getByText("5");
  const teamRole = getByText("Supplier");

  expect(teamNumber).toBeInTheDocument();
  expect(teamRole).toBeInTheDocument();
});
