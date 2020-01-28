import React, { memo } from "react";

import GamePhase from "../../types/GamePhase";
import PeriodIndicator from "../period-indicator/period-indicator.component";
import SessionInformer from "../session-informer/session-informer.component";
import styles from "./header.module.scss";

const Header: React.FC = () => {
  const dummyData = {
    currentPeriod: 1,
    periods: 3,
    phaseType: GamePhase.Analyse,
  };

  return (
    <div className={styles.wrapper}>
      <PeriodIndicator
        currentPeriod={dummyData.currentPeriod}
        periods={dummyData.periods}
        phaseType={dummyData.phaseType}
      />
      <SessionInformer />
    </div>
  );
};

/**
 * Header block on main layout
 *
 * @visibleName Header
 */
export default memo(Header);
