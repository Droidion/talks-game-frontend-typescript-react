import React from "react";

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
  return <div className={styles.errorPanel}>{text}</div>;
};

export default ErrorPanel;
