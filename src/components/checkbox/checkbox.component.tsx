import React, { memo, useState } from "react";

import styles from "./checkbox.module.scss";

type Props = {
  /** Should checkbox be toggled by default */
  defaultChecked: boolean;
  /** Event handler when user clicks the checkbox */
  toggleHandler: (isChecked: boolean) => void;
};

const Checkbox: React.FC<Props> = ({ defaultChecked, toggleHandler }) => {
  const [isChecked, setСhecked] = useState(defaultChecked);
  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setСhecked(e.target.checked);
    toggleHandler(e.target.checked);
  };
  return (
    <input
      checked={isChecked}
      className={styles.checkbox}
      data-testid="checkbox"
      onChange={handleClick}
      type="checkbox"
    />
  );
};

/**
 *  Checkbox
 *
 * @visibleName Checkbox
 */
export default memo(Checkbox);
