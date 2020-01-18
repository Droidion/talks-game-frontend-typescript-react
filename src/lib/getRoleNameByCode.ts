import { TFunction } from 'i18next';

/** Get human readable role name by its code */
const getRoleNameByCode = (roleCode: string, t: TFunction) => {
  switch (roleCode) {
    case "supplier":
      return t("Supplier");
    default:
      return t("Consumer");
  }
};

export default getRoleNameByCode;
