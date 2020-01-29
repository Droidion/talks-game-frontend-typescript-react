import React, { memo } from "react";
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

/**
 * Ribbon-like badge with TIM Group logo.
 *
 * @visibleName Badge
 */
export default memo(Badge);
