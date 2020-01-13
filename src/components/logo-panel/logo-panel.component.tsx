import React from "react";
import { useTranslation } from "react-i18next";

import { ReactComponent as Logo } from "../../images/logo.svg";
import styles from "./logo-panel.module.scss";

/**
 * Panel with TIM Group logo on main layout
 *
 * @visibleName LogoPanel
 */
const LogoPanel: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <div className={styles.name}>{t("Talks Planet")}</div>
      <div className={styles.url}>
        <a href="http://timseminar.ru/" target="_blank" rel="noopener noreferrer">
          timseminar.ru
        </a>
      </div>
    </div>
  );
};

export default LogoPanel;
