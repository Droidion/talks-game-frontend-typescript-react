import React from "react";

import styles from "./error-panel.module.scss";

type ErrorPanelProps = {
  text: string;
};

const ErrorPanel: React.FC<ErrorPanelProps> = ({ text }) => {
  return <div className={styles.errorPanel}>{text}</div>;
};

export default ErrorPanel;
