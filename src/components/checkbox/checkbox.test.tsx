import React from "react";

import { fireEvent, render } from "@testing-library/react";

import Checkbox from "./checkbox.component";

test("Renders checkbox", () => {
  const { getByTestId } = render(
    <Checkbox defaultChecked={true} toggleHandler={(x) => x} />
  );
  const checkbox = getByTestId("checkbox");
  expect(checkbox).toBeInTheDocument();
  expect(checkbox).toBeChecked();
});

test("Checkbox is clicked", () => {
  let mockValue = true;
  const testFunc = (value: boolean) => {
    mockValue = value;
  };
  const { getByTestId } = render(
    <Checkbox defaultChecked={true} toggleHandler={testFunc} />
  );
  const checkbox = getByTestId("checkbox");

  fireEvent.click(checkbox);
  expect(mockValue).toEqual(false);
});
