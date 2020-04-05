import { Decimal } from "decimal.js";
import React, { memo } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Route, Switch } from "react-router-dom";

import PageAdminTimer from "../../../pages/admin/timer/page-admin-timer.component";
import PageDeals from "../../../pages/deals/page-deals.component";
import PageFinance from "../../../pages/finance/page-finance.component";
import PageProblems from "../../../pages/problems/page-problems.component";
import PageProduction from "../../../pages/production/page-production.component";
import PageResults from "../../../pages/results/page-results.component";
import PageUpgrades from "../../../pages/upgrades/page-upgrades.component";
import { RootState } from "../../../redux/root-reducer";
import Currency from "../../../types/Currency";
import InformerType from "../../../types/InformerType";
import TeamRole from "../../../types/TeamRole";
import Header from "../../header/header.component";
import Informer from "../../informer/informer.component";
import LogoPanel from "../../logo-panel/logo-panel.component";
import MainMenu from "../../main-menu/main-menu.component";
import styles from "./layout-main.module.scss";

const LayoutMain: React.FC<ConnectedProps<typeof connector>> = ({ session }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <LogoPanel />
      </div>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.menu}>
        <MainMenu />
        <div className={styles.informerList}>
          {session?.teamType !== TeamRole.Admin && (
            <>
              <Informer
                currency={Currency.Rouble}
                title={"Денежные средства"}
                type={InformerType.Regular}
                value={new Decimal(100590.5544)}
              />
              <Informer
                currency={Currency.Rouble}
                title={"Денежные средства"}
                type={InformerType.Regular}
                value={new Decimal(1000000)}
              />
            </>
          )}
          <Informer
            currency={Currency.Rouble}
            title={"До конца периода"}
            type={InformerType.Important}
            value={"12:56"}
          />
        </div>
      </div>
      <div className={styles.content}>
        <Switch>
          <Route exact path="/deals">
            <PageDeals />
          </Route>
          <Route exact path="/finance">
            <PageFinance />
          </Route>
          <Route exact path="/problems">
            <PageProblems />
          </Route>
          <Route exact path="/production">
            <PageProduction />
          </Route>
          <Route exact path="/results">
            <PageResults />
          </Route>
          <Route exact path="/upgrades">
            <PageUpgrades />
          </Route>
          <Route exact path="/admin/timer">
            <PageAdminTimer />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  session: state.session.session,
});

const connector = connect(mapStateToProps);

/**
 * Layout for main game after authentication
 *
 * @visibleName LayoutMain
 */
export default memo(connector(LayoutMain));
