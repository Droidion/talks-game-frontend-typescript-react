import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./page-signin.module.scss";
import InputPassword from "../../components/input-password/input-password.component";

const PageSignin: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t("Talks Planet")}</h1>
      <InputPassword />
    </div>
  );
};

export default PageSignin;
