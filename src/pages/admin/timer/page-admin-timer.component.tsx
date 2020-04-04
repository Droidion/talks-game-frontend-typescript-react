import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import apiQueries from "../../../lib/apiQueries";
import fetchGraphQL from "../../../lib/fetchGraphQL";
import { ITimer } from "../../../types/Timer";

const PageAdminTimer: React.FC = () => {
  const { t } = useTranslation();
  const [timers, setTimers] = useState<ITimer[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchGraphQL<{ timers: ITimer[] }>(apiQueries.TIMERS, {});
      setTimers(result.timers);
    };
    fetchData();
  }, []);
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

/**
 * Page for managing timer for each period
 *
 * @visibleName PageAdminTimer
 */
export default PageAdminTimer;
