import "../i18n";

import i18n from "i18next";

import Timer from "./timer";

const timer = new Timer();
i18n.changeLanguage("en");

test("Returns proper value of time left", () => {
  const expectedValue = "01:00:03";
  timer.setInitialTimeLeft("10:59:57", "12:00:00");
  const value = timer.value;
  expect(value).toBe(expectedValue);
});

test("Returns proper value of time left after call decreaseTimeLeft left function", () => {
  const expectedValue = "01:04:02";
  timer.setInitialTimeLeft("10:55:57", "12:00:00");
  timer.decreaseTimeLeft();
  const value = timer.value;
  expect(value).toBe(expectedValue);
});

test("Returns expiration message when time left is ended", () => {
  const expirationMessage = "Period ended";
  timer.setInitialTimeLeft("11:00:00", "11:00:00");
  const value = timer.value;
  expect(value).toBe(expirationMessage);
});
