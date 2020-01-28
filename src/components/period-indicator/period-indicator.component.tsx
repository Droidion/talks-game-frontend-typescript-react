import React, { memo } from "react";

import GamePhase from "../../types/GamePhase";
import PeriodIndicatorItem from "./period-indicator-item/period-indicator-item.component";
import styles from "./period-indicator.module.scss";

type Props = {
  /** Number of the active period */
  currentPeriod: number;
  /** Number of periods */
  periods: number;
  /** Game phase: "Play" or "Analyse" */
  phaseType: GamePhase;
};

const PeriodIndicator: React.FC<Props> = ({ periods, currentPeriod, phaseType }) => {
  const periodIndicatorItems = [];
  for (let i = 1; i <= periods; i += 1) {
    //Check if this period future
    const isFuturePeriod = currentPeriod < i;
    //Check if analise phase of this period has already started
    const isAnalysePast =
      !isFuturePeriod || (currentPeriod === i && phaseType === GamePhase.Analyse);

    periodIndicatorItems.push(
      <PeriodIndicatorItem
        isAnalysePhaseFilled={isAnalysePast}
        isPlayPhaseFilled={!isFuturePeriod}
        key={i}
        periodNumber={i}
      />
    );
  }

  return <div className={styles.wrapper}>{periodIndicatorItems}</div>;
};

/**
 * Period Indicator block on main layout
 *
 * @visibleName PeriodIndicator
 */
export default memo(PeriodIndicator);
