import React from "react";

import styles from "./error-panel.module.scss";

type ErrorPanelProps = {
  /** Error text */
  text: string;
};

/**
 * Small panel indicating some error on authentication layout pages
 *
 * @visibleName ErrorPanel
 */
const ErrorPanel: React.FC<ErrorPanelProps> = ({ text }) => {
  return <div className={styles.errorPanel}>{text}</div>;
};

export default ErrorPanel;
