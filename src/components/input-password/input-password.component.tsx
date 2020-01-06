import React from "react";

import styles from "./input-password.module.scss";
import { useTranslation } from "react-i18next";

const InputPassword: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div>
      <input className={styles.input} type="password" placeholder={t("Password")} />
    </div>
  );
};

export default InputPassword;
