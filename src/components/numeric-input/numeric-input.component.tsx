import classnames from "classnames";
import { Decimal } from "decimal.js";
import React from "react";

import formatNumbersAsCurrency from "../../lib/formatNumbersAsCurrency";
import styles from "./numeric-input.module.scss";

interface INumericInputProps {
  handleChange: Function;
  incrementalAmount: Decimal;
  initialValue: Decimal;
  isExtremeHelpersActive: boolean;
  isDisabled: boolean;
  isIncrementerActive: boolean;
  maxPossibleValue?: Decimal | undefined;
  minPossibleValue?: Decimal | undefined;
}

interface INumericInputState {
  value: string;
}

type Props = INumericInputProps;
/**
 * Numeric imput
 *
 * @visibleName NumericImput
 */

class NumericImput extends React.Component<Props, INumericInputState> {
  constructor(props: INumericInputProps) {
    super(props);
    this.state = {
      value: formatNumbersAsCurrency(this.props.initialValue.toFixed(2)),
    };
  }

  normalizedValue = (value: string) => {
    const normalizedValue = value.replace(/\s/g, "");
    return !!normalizedValue ? normalizedValue : "0";
  };
  handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = this.normalizedValue(event.target.value);
    if (inputValue.match(/(^(\d+(\.?\d{0,2})?)?$)/)) {
      this.setState({ value: formatNumbersAsCurrency(inputValue) });
      this.props.handleChange(new Decimal(inputValue));
      console.log(inputValue);
    }
  };
  handleIncrement = (event: React.MouseEvent<HTMLButtonElement>) => {
    const increment =
      event.currentTarget.value === "increase"
        ? this.props.incrementalAmount
        : this.props.incrementalAmount.times(-1);
    const currentValue = this.normalizedValue(this.state.value);
    const changedValue = new Decimal(currentValue).add(increment).toString();
    this.setState({ value: formatNumbersAsCurrency(changedValue) });
    this.props.handleChange(changedValue);
  };

  render() {
    const incrementer = this.props.isIncrementerActive && (
      <div
        className={classnames(styles.helpers, {
          [styles.outside]: !this.props.isExtremeHelpersActive,
        })}
      >
        <button
          className={styles.incrementer}
          value={"increase"}
          onClick={this.handleIncrement}
        >
          ▲
        </button>
        <button
          className={styles.incrementer}
          value={"decrease"}
          onClick={this.handleIncrement}
        >
          ▼
        </button>
      </div>
    );
    const extremeHelpers = this.props.isExtremeHelpersActive && (
      <div className={classnames(styles.helpers, styles.outside)}>
        <button className={styles.extreme}>max</button>
        <button className={styles.extreme}>min</button>
      </div>
    );
    return (
      <div className={styles.wrapper}>
        <input
          className={styles.input}
          disabled={this.props.isDisabled}
          type="text"
          value={this.state.value}
          onChange={this.handleChangeInput}
        />
        {incrementer}
        {extremeHelpers}
      </div>
    );
  }
}

export default NumericImput;
