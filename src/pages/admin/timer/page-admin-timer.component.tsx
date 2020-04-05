import Decimal from "decimal.js";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { connect, ConnectedProps } from "react-redux";

import NumericInput from "../../../components/numeric-input/numeric-input.component";
import apiQueries from "../../../lib/apiQueries";
import fetchGraphQL from "../../../lib/fetchGraphQL";
import { RootState } from "../../../redux/root-reducer";
import { ITimer } from "../../../types/Timer";
import styles from "./page-admin-timer.module.scss";

const PageAdminTimer: React.FC<ConnectedProps<typeof connector>> = ({ session }) => {
  const { t } = useTranslation();
  const [timers, setTimers] = useState<ITimer[]>([]);

  // Load timers data from database when component renders
  useEffect(() => {
    const fetchData = async () => {
      if (session) {
        const result = await fetchGraphQL<{ timers: ITimer[] }>(apiQueries.TIMERS, {
          token: session.token,
        });
        setTimers(result.timers);
      }
    };
    fetchData();
  }, [session]);

  const handleChange = (period: number, prop: keyof ITimer, value: Decimal) => {
    const res = timers.reduce((acc: ITimer[], val: ITimer) => {
      const obj = { ...val };
      if (obj.period === period) {
        obj[prop] = value.toNumber();
      }
      acc.push(obj);
      return acc;
    }, []);
    setTimers(res);
  };

  return (
    <div className="content-panel">
      <h1>{t("Timer Management")}</h1>
      <div>
        Set the hour and mintue when play time for each period is supposed to end
      </div>
      {timers.map((timer) => (
        <div className={styles.element} key={timer.period}>
          <div className={styles.periodNumber}>Period {timer.period}</div>
          <div className={styles.section}>
            <div>Hour</div>
            <NumericInput
              digitsAfterDot={0}
              handleChange={(val: Decimal) =>
                handleChange(timer.period, "hour", val)
              }
              incrementalAmount={new Decimal(1)}
              initialValue={new Decimal(timer.hour)}
              maxPossibleValue={new Decimal(23)}
            />
          </div>
          <div className={styles.section}>
            <div>Minute</div>
            <NumericInput
              digitsAfterDot={0}
              handleChange={(val: Decimal) =>
                handleChange(timer.period, "minute", val)
              }
              incrementalAmount={new Decimal(1)}
              initialValue={new Decimal(timer.minute)}
              maxPossibleValue={new Decimal(59)}
            />
          </div>
        </div>
      ))}
      <button>Save</button>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  session: state.session.session,
});

const connector = connect(mapStateToProps);

/**
 * Page for managing timer for each period
 *
 * @visibleName PageAdminTimer
 */
export default connector(PageAdminTimer);
