import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

import styles from "./button-auth.module.scss";

type ButtonAuthProps = {
  /** Event handler when user clicks the button */
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Should loading indicator be shown */
  isLoading: boolean;
  /** Button text */
  text: string;
};

/**
 * Button with rounded corners used only on authentication layout with dark background
 *
 * @visibleName ButtonAuth
 */
const ButtonAuth: React.FC<ButtonAuthProps> = ({ handleClick, isLoading, text }) => {
  return (
    <button className={styles.btn} disabled={isLoading} onClick={handleClick}>
      {isLoading ? (
        <div data-testid="clipLoader" className={styles.loader}>
          <ClipLoader size={20} color={"#2c2c2c"} loading={isLoading} />
        </div>
      ) : (
        text
      )}
    </button>
  );
};

export default ButtonAuth;
