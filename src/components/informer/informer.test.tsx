import { Decimal } from "decimal.js";
import React from "react";

import { render } from "@testing-library/react";

import Currency from "../../types/Currency";
import InformerType from "../../types/InformerType";
import Informer from "./informer.component";

test("Renders regular informer", () => {
  const { getByText, queryByTestId } = render(
    <Informer
      currency={Currency.Rouble}
      title={"Денежные средства"}
      type={InformerType.Regular}
      value={new Decimal("1500566.55")}
    />
  );
  const title = getByText("Денежные средства");
  const value = getByText("1 500 566.55 ₽");

  expect(title).toBeInTheDocument();
  expect(value).toBeInTheDocument();
});

test("Renders important informer", () => {
  const { getByText, queryByTestId } = render(
    <Informer
      currency={Currency.Rouble}
      title={"До конца периода"}
      type={InformerType.Important}
      value={"15:32"}
    />
  );
  const title = getByText("До конца периода");
  const value = getByText("15:32");

  expect(title).toBeInTheDocument();
  expect(value).toBeInTheDocument();
});
