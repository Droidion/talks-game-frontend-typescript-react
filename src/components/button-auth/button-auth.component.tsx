import React from "react";

import styles from "./button-auth.module.scss";

type ButtonAuthProps = {
  text: string;
};

const ButtonAuth: React.FC<ButtonAuthProps> = ({ text }) => {
  return <button className={styles.btn}>{text}</button>;
};

export default ButtonAuth;
