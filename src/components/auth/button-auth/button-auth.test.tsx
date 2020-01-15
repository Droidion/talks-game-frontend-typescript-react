import React from "react";

import { render, fireEvent } from "@testing-library/react";

import ButtonAuth from "./button-auth.component";

test("button has text", () => {
  const { getByText } = render(
    <ButtonAuth handleClick={() => {}} isLoading={false} text={"A button"} />
  );
  const button = getByText("A button");
  expect(button).toBeInTheDocument();
});

test("button has loader", () => {
  const { getByTestId } = render(
    <ButtonAuth handleClick={() => {}} isLoading={true} text={"A button"} />
  );
  const loader = getByTestId("clipLoader");
  expect(loader).toBeInTheDocument();
});

test("button was clicked and executed the handler", () => {
  let buttonWasClicked = false;
  const testFunc = () => {
    buttonWasClicked = true;
  };
  const { getByText } = render(
    <ButtonAuth handleClick={testFunc} isLoading={false} text={"A button"} />
  );
  const button = getByText("A button");
  fireEvent.click(button);
  expect(buttonWasClicked).toBeTruthy();
});
