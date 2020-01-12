import React from "react";

import classnames from "classnames";

import styles from "./team-number-selector.module.scss";

type TeamNumberSelectorProps = {
  handleClick: (num: number) => void;
  isSelected: boolean;
  number: number;
};

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
