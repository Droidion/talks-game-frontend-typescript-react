import classnames from "classnames";
import { Decimal } from "decimal.js";
import React from "react";

import formatNumbersAsCurrency from "../../lib/formatNumbersAsCurrency";
import styles from "./numeric-input.module.scss";

interface INumericInputState {
  /** Current inputted value */
  value: string;
}

interface INumericInputProps {
  /** Event handler when user change input value */
  handleChange: Function;
  /** Amount for increase/decrease buttons */
  incrementalAmount: Decimal;
  /** Initial value of input */
  initialValue: Decimal;
  /** Should input be disabled */
  isDisabled: boolean;
  /** Should min/max helper buttons be shown */
  isExtremeHelpersActive: boolean;
  /** Should increase/decrease helper buttons be shown */
  isIncrementerActive: boolean;
  /** Max possible value */
  maxPossibleValue: Decimal;
  /** Min possible value */
  minPossibleValue: Decimal;
}

/**
 * Numeric input with incremental and extreme stepper buttons. Input used only to enter numbers
 *
 * @visibleName NumericInput
 */

class NumericInput extends React.Component<INumericInputProps, INumericInputState> {
  constructor(props: INumericInputProps) {
    super(props);
    this.state = {
      value: this.props.initialValue.toFixed(2),
    };
  }

  static defaultProps = {
    maxPossibleValue: new Decimal(0),
    minPossibleValue: new Decimal(0),
  };

  clamp = (number: number) => {
    const { minPossibleValue } = this.props;
    const { maxPossibleValue } = this.props;
    return Decimal.min(
      Decimal.max(number, minPossibleValue.toNumber()),
      maxPossibleValue.toNumber()
    );
  };

  handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = this.normalizeValue(event.target.value);
    console.log(inputValue);
    if (inputValue.match(/(^(\d+(\.?\d*)?)?$)/)) {
      const calculatedValue = this.clamp(new Decimal(inputValue).toNumber());
      console.log(calculatedValue.toString());
      this.setState({ value: calculatedValue.toFixed(2) });

      if (event.target.selectionStart) {
        console.log(event.target.selectionStart);
        event.target.setSelectionRange(
          event.target.selectionStart,
          event.target.selectionStart
        );
      }

      this.props.handleChange(calculatedValue);
    }
  };

  handleIncrement = (event: React.MouseEvent<HTMLButtonElement>) => {
    const increment =
      event.currentTarget.name === "increase"
        ? this.props.incrementalAmount
        : this.props.incrementalAmount.neg();
    const currentValue = this.normalizeValue(this.state.value);
    const calculatedValue = this.clamp(
      new Decimal(currentValue).add(increment).toNumber()
    );
    this.setState({ value: calculatedValue.toFixed(2) });
    this.props.handleChange(calculatedValue);
  };

  normalizeValue = (value: string) => {
    const normalizedValue = value.replace(/\s/g, "");
    return !!normalizedValue ? normalizedValue : "0";
  };

  setExtreme = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event.currentTarget.name);
    const extremeType = event.currentTarget.name;
    const calculatedValue =
      extremeType === "max"
        ? this.props.maxPossibleValue
        : this.props.minPossibleValue;
    if (calculatedValue) {
      this.setState({ value: calculatedValue.toFixed(2) });
      this.props.handleChange(calculatedValue);
    }
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
          name={"increase"}
          onClick={this.handleIncrement}
        >
          ▲
        </button>
        <button
          className={styles.incrementer}
          name={"decrease"}
          onClick={this.handleIncrement}
        >
          ▼
        </button>
      </div>
    );
    const extremeHelpers = this.props.isExtremeHelpersActive && (
      <div className={classnames(styles.helpers, styles.outside)}>
        <button className={styles.extreme} name={"max"} onClick={this.setExtreme}>
          max
        </button>
        <button className={styles.extreme} name={"min"} onClick={this.setExtreme}>
          min
        </button>
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

export default NumericInput;
