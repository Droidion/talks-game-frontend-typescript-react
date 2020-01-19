import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./error-panel.module.scss";

type Props = {
  /** Error text */
  text: string;
};

/**
 * Small panel indicating some error on authentication layout pages
 *
 * @visibleName ErrorPanel
 */
const ErrorPanel: React.FC<Props> = ({ text }) => {
  const { t } = useTranslation();
  return (
    <div data-testid={"errorPanel"} className={styles.errorPanel}>
      {t(text)}
    </div>
  );
};

export default ErrorPanel;
