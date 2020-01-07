import React from "react";
import { useTranslation } from "react-i18next";

import { ReactComponent as LogoSvg } from "../../images/logo.svg";
import styles from "./badge.module.scss";

const Badge: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.wrapper}>
      <div>
        <LogoSvg />
      </div>
      <div className={styles.caption}>{t("Trainings and Simulations")}</div>
    </div>
  );
};

export default Badge;
