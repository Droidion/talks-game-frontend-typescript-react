import classnames from "classnames";
import { Decimal } from "decimal.js";
import React from "react";
import { useTranslation } from "react-i18next";

import formatNumbersAsCurrency from "../../lib/formatNumbersAsCurrency";
import Currency from "../../types/Currency";
import InformerType from "../../types/InformerType";
import styles from "./informer.module.scss";

type Props = {
  /** Currency of regular informer */
  currency: Currency | undefined;
  /** Title of informer */
  title: string;
  /** Informer type: "Regular" or "Important" */
  type: InformerType;
  /** Value of informer */
  value: Decimal | string;
};

/**
 * Informer block
 *
 * @visibleName Informer
 */

const Informer: React.FC<Props> = ({ title, type, value }) => {
  const { t } = useTranslation();
  const informerValue =
    type === InformerType.Important
      ? value
      : `${formatNumbersAsCurrency((value as Decimal).toFixed(2))} ${
          Currency.Rouble
        }`;
  return (
    <div
      data-testid="informer"
      className={classnames(styles.informer, {
        [styles.informerImportant]: type === InformerType.Important,
      })}
    >
      <div data-testid="title" className={styles.title}>
        {t(title)}
      </div>
      <div
        data-testid="value"
        title={informerValue as string}
        className={classnames(styles.value, {
          [styles.valueImportant]: type === InformerType.Important,
        })}
      >
        {informerValue}
      </div>
    </div>
  );
};

export default Informer;
