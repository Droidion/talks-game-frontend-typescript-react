import React from "react";

import { render, fireEvent } from "@testing-library/react";

import TeamRoleSelector from "./team-role-selector.component";

test("renders team role", () => {
  const { getByText } = render(
    <TeamRoleSelector handleClick={() => {}} isSelected={false} role={"supplier"} />
  );
  const teamNumber = getByText("Supplier");
  expect(teamNumber).toBeInTheDocument();
});

test("submits team role on click", () => {
  let selectedRole = "";
  const handler = (role: string) => {
    selectedRole = role;
  };
  const { getByText } = render(
    <TeamRoleSelector handleClick={handler} isSelected={false} role={"supplier"} />
  );
  const teamNumber = getByText("Supplier");
  fireEvent.click(teamNumber);
  expect(selectedRole).toEqual("supplier");
});
