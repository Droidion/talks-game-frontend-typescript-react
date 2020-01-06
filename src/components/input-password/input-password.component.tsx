import React from "react";

import styles from "./input-password.module.scss";
import { useTranslation } from "react-i18next";

import ButtonAuth from "../button-auth/button-auth.component";

const InputPassword: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.wrapper}>
      <input className={styles.input} type="password" placeholder={t("Password")} />
      <div className={styles.btnContainer}>
        <ButtonAuth text={t("Sign in")} />
      </div>
    </div>
  );
};

export default InputPassword;
