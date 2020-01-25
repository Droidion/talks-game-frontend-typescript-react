import { Decimal } from "decimal.js";
import React from "react";

import Currency from "../../../types/Currency";
import InformerType from "../../../types/InformerType";
import ISessionState from "../../../types/ISessionState";
import ContentPanel from "../../content-panel/content-panel.component";
import Header from "../../header/header.component";
import Informer from "../../informer/informer.component";
import LogoPanel from "../../logo-panel/logo-panel.component";
import styles from "./layout-main.module.scss";

/**
 * Layout for main game after authentication
 *
 * @visibleName LayoutMain
 */
const LayoutMain: React.FC<ISessionState> = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <LogoPanel />
      </div>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.menu}>
        menu
        <div className={styles.informerList}>
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
          <Informer
            currency={Currency.Rouble}
            title={"До конца периода"}
            type={InformerType.Important}
            value={"12:56"}
          />
        </div>
      </div>
      <div className={styles.content}>
        <ContentPanel />
      </div>
    </div>
  );
};

export default LayoutMain;
