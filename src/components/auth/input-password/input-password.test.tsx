import React from "react";
import { Provider } from "react-redux";

import { render, fireEvent } from "@testing-library/react";
import store from "../../../redux/store";

import InputPassword from "./input-password.component";

test("input field and button are present", () => {
  const { getByPlaceholderText, getByText } = render(
    <Provider store={store}>
      <InputPassword handlePassword={() => {}} />
    </Provider>
  );
  const input = getByPlaceholderText("Password");
  const button = getByText("Sign in");
  expect(input).toBeInTheDocument();
  expect(button).toBeInTheDocument();
});

test("password is submitted", () => {
  let mockPassword = "d";
  const testFunc = (password: string) => {
    mockPassword = password;
  };
  const { getByPlaceholderText, getByText } = render(
    <Provider store={store}>
      <InputPassword handlePassword={testFunc} />
    </Provider>
  );
  const input = getByPlaceholderText("Password");
  const button = getByText("Sign in");
  fireEvent.change(input, { target: { value: "good-password" } });
  fireEvent.click(button);
  expect(mockPassword).toEqual("good-password");
});
