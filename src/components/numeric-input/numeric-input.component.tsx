import { Decimal } from "decimal.js";
import React from "react";

import styles from "./numeric-input.module.scss";

type Props = {
  getValue: Function;
  incrementalAmount: Decimal;
  initialValue: Decimal;
  isExtremeHelpersActive: boolean;
  isDisabled: boolean;
  isIncrementalHelpersActive: boolean;
  maxPossibleValue: Decimal | undefined;
  minPossibleValue: Decimal | undefined;
};

/**
 * Numeric imput
 *
 * @visibleName NumericImput
 */

const NumericImput: React.FC<Props> = ({
  getValue,
  incrementalAmount,
  initialValue,
  isExtremeHelpersActive,
  isDisabled,
  isIncrementalHelpersActive,
  maxPossibleValue,
  minPossibleValue,
}) => {
  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        disabled={isDisabled}
        type="text"
        placeholder={initialValue.toString()}
      />
    </div>
  );
};

export default NumericImput;
