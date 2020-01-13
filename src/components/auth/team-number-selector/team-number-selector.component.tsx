import React from "react";

import classnames from "classnames";

import styles from "./team-number-selector.module.scss";

type TeamNumberSelectorProps = {
  /** Should loading indicator be shown */
  handleClick: (num: number) => void;
  /** Is this instance selected. Currently not used */
  isSelected: boolean;
  /** Name of the team role */
  number: number;
};

/**
 * Selector for a team number
 *
 * @visibleName TeamNumberSelector
 */
const TeamNumberSelector: React.FC<TeamNumberSelectorProps> = ({
  handleClick,
  isSelected,
  number,
}) => {
  return (
    <div
      className={classnames(styles.selector, { [styles.selected]: isSelected })}
      onClick={() => handleClick(number)}
    >
      {number}
    </div>
  );
};

export default TeamNumberSelector;
