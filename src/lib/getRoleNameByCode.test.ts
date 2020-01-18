import getRoleNameByCode from "./getRoleNameByCode";
import TeamRole from "../types/TeamRole";

test("Returns human readable role name by its code", () => {
  const consumerRole = "Consumer";
  const supplierRole = "Supplier";

  expect(getRoleNameByCode(TeamRole.Consumer, (x: string) => x)).toBe(consumerRole);
  expect(getRoleNameByCode(TeamRole.Supplier, (x: string) => x)).toBe(supplierRole);
});
