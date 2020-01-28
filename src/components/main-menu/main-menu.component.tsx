import classnames from "classnames";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

import styles from "./main-menu.module.scss";

const menuItems = [
  {
    text: "Production",
    path: "/production",
  },
  {
    text: "Deals",
    path: "/deals",
  },
  {
    text: "Upgrades",
    path: "/upgrades",
  },
  {
    text: "Results",
    path: "/results",
  },
  {
    text: "Problems",
    path: "/problems",
  },
  {
    text: "Finance",
    path: "/finance",
  },
];

const MainMenu: React.FC = () => {
  const { t } = useTranslation();
  let location = useLocation();
  return (
    <div className={styles.wrapper}>
      {menuItems.map((menuItem, index) => (
        <Link key={`menuItem_${index}`} to={menuItem.path}>
          <div
            className={classnames(styles.item, {
              [styles.selected]: menuItem.path === location.pathname,
            })}
          >
            {t(menuItem.text)}
          </div>
        </Link>
      ))}
    </div>
  );
};

/**
 * Main menu for left panel
 *
 * @visibleName MainMenu
 */
export default memo(MainMenu);
