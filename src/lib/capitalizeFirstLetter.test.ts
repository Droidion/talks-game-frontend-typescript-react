import capitalizeFirstLetter from "./capitalizeFirstLetter";

test("Capitalize happens", () => {
  expect(capitalizeFirstLetter("foo")).toBe("Foo");
  expect(capitalizeFirstLetter("FOO")).toBe("FOO");
  expect(capitalizeFirstLetter("")).toBe("");
});
