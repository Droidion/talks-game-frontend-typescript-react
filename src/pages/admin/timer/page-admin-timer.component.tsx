import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { connect, ConnectedProps } from "react-redux";

import apiQueries from "../../../lib/apiQueries";
import fetchGraphQL from "../../../lib/fetchGraphQL";
import { RootState } from "../../../redux/root-reducer";
import { ITimer } from "../../../types/Timer";

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

  return (
    <div className="content-panel">
      <h1>{t("Timer Management")}</h1>
      {timers.map((timer) => (
        <div key={timer.period}>
          {timer.period} - {timer.hour} - {timer.minute}
        </div>
      ))}
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
