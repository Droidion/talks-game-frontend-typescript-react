import classnames from "classnames";
import React from "react";

import styles from "./period-indicator-item.module.scss";

type Props = {
  /** Is analyse phase period of this indicator instance filled */
  isAnalysePhaseFilled: boolean;
  /** Is play phase period of this indicator instance filled */
  isPlayPhaseFilled: boolean;
  /** Number of the period for this indicator instance */
  periodNumber: number;
};

/**
 * Period Indicator Item on main layout
 *
 * @visibleName PeriodIndicatorItem
 */

const PeriodIndicatorItem: React.FC<Props> = ({
  isAnalysePhaseFilled,
  isPlayPhaseFilled,
  periodNumber,
}) => {
  return (
    <div data-testid="periodIndicatorItem" className={styles.periodItem}>
      <div
        data-testid="front"
        className={classnames(styles.front, {
          [styles.play]: isPlayPhaseFilled,
        })}
      >
        <span
          data-testid="number"
          className={classnames(styles.number, {
            [styles.future]: !isPlayPhaseFilled,
          })}
        >
          {periodNumber}
        </span>
      </div>
      <div
        data-testid="back"
        className={classnames(styles.back, {
          [styles.analyse]: isAnalysePhaseFilled,
        })}
      />
    </div>
  );
};

export default PeriodIndicatorItem;
