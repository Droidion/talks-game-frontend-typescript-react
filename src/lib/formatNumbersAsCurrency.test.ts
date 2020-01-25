import formatNumbersAsCurrency from "./formatNumbersAsCurrency";

test("Returns format number as string", () => {
  const needFormat = "1000000";
  const needNotFormat = "100";

  expect(formatNumbersAsCurrency(needFormat)).toBe("1 000 000");
  expect(formatNumbersAsCurrency(needNotFormat)).toBe("100");
});
