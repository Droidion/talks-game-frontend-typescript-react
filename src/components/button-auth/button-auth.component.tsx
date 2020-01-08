import React from "react";

import styles from "./button-auth.module.scss";

type ButtonAuthProps = {
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  text: string;
};

const ButtonAuth: React.FC<ButtonAuthProps> = ({ text, handleClick }) => {
  return (
    <button onClick={handleClick} className={styles.btn}>
      {text}
    </button>
  );
};

export default ButtonAuth;
