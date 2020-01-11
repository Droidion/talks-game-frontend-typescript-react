import React from "react";

import classnames from "classnames";

import styles from "./team-number-selector.module.scss";

type TeamNumberSelectorProps = {
  handleClick: (num: number) => void;
  isSelected: boolean;
  number: number;
};

const TeamNumberSelector: React.FC<TeamNumberSelectorProps> = ({
  isSelected,
  number,
  handleClick,
}) => {
  return (
    <div
      onClick={() => handleClick(number)}
      className={classnames(styles.selector, { [styles.selected]: isSelected })}
    >
      {number}
    </div>
  );
};

export default TeamNumberSelector;
