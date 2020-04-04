import React from "react";
import { useTranslation } from "react-i18next";

const PageAdminTimer: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="content-panel">
      <h1>{t("Timer Management")}</h1>
    </div>
  );
};

/**
 * Page for managing timer for each period
 *
 * @visibleName PageAdminTimer
 */
export default PageAdminTimer;
