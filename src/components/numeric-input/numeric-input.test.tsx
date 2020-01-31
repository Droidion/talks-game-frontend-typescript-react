import Decimal from "decimal.js";
import React from "react";

import { fireEvent, render } from "@testing-library/react";

import NumericInput from "./numeric-input.component";

test("Renders numeric input with incrementer and extreme helpers", () => {
  const { getByTestId } = render(
    <NumericInput
      handleChange={(x) => x}
      initialValue={new Decimal(1000)}
      isDisabled={false}
      isIncrementerActive={true}
      incrementalAmount={new Decimal(100)}
      isExtremeHelpersActive={true}
    />
  );

  const input = getByTestId("input");
  const incrementer = getByTestId("incrementer");
  const extremeHelpers = getByTestId("extremeHelpers");
  expect(input).toBeInTheDocument();
  expect(incrementer).toBeInTheDocument();
  expect(extremeHelpers).toBeInTheDocument();
});

test("Incrementer is submitted", () => {
  let mockValue = 0;
  const testFunc = (value: Decimal) => {
    mockValue = value.toNumber();
  };
  const { getByTestId } = render(
    <NumericInput
      handleChange={testFunc}
      initialValue={new Decimal(1000)}
      isDisabled={false}
      isIncrementerActive={true}
      incrementalAmount={new Decimal(100)}
      isExtremeHelpersActive={true}
      maxPossibleValue={new Decimal(1000000)}
    />
  );
  const increase = getByTestId("increase");
  const decrease = getByTestId("decrease");

  fireEvent.click(increase);
  expect(mockValue).toEqual(1100);
  fireEvent.click(decrease);
  expect(mockValue).toEqual(1000);
});

test("Extreme helpers is submitted with default value for masPossibleValue", () => {
  let mockValue = 200;
  const testFunc = (value: Decimal) => {
    mockValue = value.toNumber();
  };
  const { getByTestId } = render(
    <NumericInput
      handleChange={testFunc}
      initialValue={new Decimal(1000)}
      isDisabled={false}
      isIncrementerActive={true}
      incrementalAmount={new Decimal(100)}
      isExtremeHelpersActive={true}
      maxPossibleValue={new Decimal(1000000)}
    />
  );
  const max = getByTestId("max");
  const min = getByTestId("min");

  fireEvent.click(max);
  expect(mockValue).toEqual(1000000);
  fireEvent.click(min);
  expect(mockValue).toEqual(0);
});
