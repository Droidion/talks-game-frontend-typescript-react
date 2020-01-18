import getRoleNameByCode from "./getRoleNameByCode";

test("Returns human readable role name by its code", () => {
  const consumerRole = "Consumer";
  const supplierRole = "Supplier"; 
  
  expect(getRoleNameByCode("consumer", (x: string) => x)).toBe(consumerRole);
  expect(getRoleNameByCode("supplier", (x: string) => x)).toBe(supplierRole);
});
