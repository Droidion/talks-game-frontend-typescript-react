import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./page-signin.module.scss";
import InputPassword from "../../components/input-password/input-password.component";

const PageSignin: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.wrapper}>
      <h1>{t("Talks Planet")}</h1>
      <h2>{t("Business Simulation by TIM Group")}</h2>
      <div className={styles.separator}></div>
      <InputPassword />
    </div>
  );
};

export default PageSignin;
