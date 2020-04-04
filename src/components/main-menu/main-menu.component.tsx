import classnames from "classnames";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { connect, ConnectedProps } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import { RootState } from "../../redux/root-reducer";
import adminItems from "./items/admin";
import gameItems from "./items/game";
import styles from "./main-menu.module.scss";
import TeamRole from "../../types/TeamRole";

const MainMenu: React.FC<ConnectedProps<typeof connector>> = ({ session }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const menuItems = session?.teamType === TeamRole.Admin ? adminItems : gameItems;
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

const mapStateToProps = (state: RootState) => ({
  session: state.session.session,
});

const connector = connect(mapStateToProps);

/**
 * Main menu for left panel
 *
 * @visibleName MainMenu
 */
export default memo(connector(MainMenu));
