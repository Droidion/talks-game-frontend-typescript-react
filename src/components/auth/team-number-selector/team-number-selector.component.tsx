import React, { memo } from "react";

import classnames from "classnames";

import styles from "./team-number-selector.module.scss";

type Props = {
  /** Handle user clicking on a selector item */
  handleClick: (num: number) => void;
  /** Is this instance selected. Currently not used */
  isSelected: boolean;
  /** Team number */
  number: number;
};

const TeamNumberSelector: React.FC<Props> = ({
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

/**
 * Selector for a team number
 *
 * @visibleName TeamNumberSelector
 */
export default memo(TeamNumberSelector);
