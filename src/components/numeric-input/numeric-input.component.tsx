import classnames from "classnames";
import { Decimal } from "decimal.js";
import React from "react";

import formatNumbersAsCurrency from "../../lib/formatNumbersAsCurrency";
import styles from "./numeric-input.module.scss";

interface INumericInputState {
  /** Current cursor position */
  position: number | null;
  /** Current inputted value */
  value: string;
}

interface INumericInputProps {
  /** Callback function for returning value on change*/
  handleChange: (input: Decimal) => void;
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
  private inputRef: React.RefObject<HTMLInputElement>;
  constructor(props: INumericInputProps) {
    super(props);
    this.inputRef = React.createRef();

    this.state = {
      value: formatNumbersAsCurrency(this.props.initialValue.toFixed(2)),
      position: null,
    };
  }

  // Default values for maxPossibleValue and minPossibleValue
  static defaultProps = {
    maxPossibleValue: new Decimal(0),
    minPossibleValue: new Decimal(0),
  };

  /** Clamp an value within a minPossibleValue and maxPossibleValue */
  clamp = (input: string) => {
    const { minPossibleValue } = this.props;
    const { maxPossibleValue } = this.props;
    const inputAsDecimal = new Decimal(input);
    return Decimal.min(
      Decimal.max(inputAsDecimal, minPossibleValue),
      maxPossibleValue
    );
  };

  /** Return proper cursor position if value formatted */
  calculateCursorPosition = (
    input: string,
    formatted: string,
    currentPosition: number | null
  ) => {
    const shift = formatted.length - input.length;
    // If current position = 0 and shift = -1 Math.max prevent moving cursor to end
    return currentPosition !== null ? Math.max(currentPosition + shift, 0) : shift;
  };

  componentDidUpdate() {
    if (this.inputRef.current) {
      // Set cursor position after rendering
      this.inputRef.current.selectionStart = this.state.position;
      this.inputRef.current.selectionEnd = this.state.position;
    }
  }

  /** Event handler when user change input value  */
  handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = this.normalizeValue(event.target.value);

    if (this.hasProperFormat(inputValue)) {
      const position = event.target.selectionStart;
      const formattedInput = formatNumbersAsCurrency(inputValue);

      if (this.shouldCommitInput(inputValue)) {
        const calculatedValue = this.clamp(inputValue);
        const formattedCalcValue = formatNumbersAsCurrency(
          calculatedValue.toFixed(2)
        );

        this.setState({
          value: formattedCalcValue,
          position: this.calculateCursorPosition(
            event.target.value,
            formattedCalcValue,
            position
          ),
        });

        this.props.handleChange(calculatedValue);
      } else {
        this.setState({ value: formattedInput, position: position });
      }
    }
  };

  /** Increase or decrease value if incremental buttons click */
  handleIncrement = (event: React.MouseEvent<HTMLButtonElement>) => {
    const increment =
      event.currentTarget.name === "increase"
        ? this.props.incrementalAmount
        : this.props.incrementalAmount.neg();
    const currentValue = this.normalizeValue(this.state.value);

    const calculatedValue = this.clamp(
      new Decimal(currentValue).add(increment).toString()
    );
    const formattedCalc = formatNumbersAsCurrency(calculatedValue.toFixed(2));

    this.setState({ value: formattedCalc });
    this.props.handleChange(calculatedValue);
  };

  /** Check if the user enters only numbers. Only two digits after dot are allowed */
  hasProperFormat = (input: string) => {
    return input.match(/(^(\d+(\.?\d{0,2})?)?$)/) !== null;
  };

  /** Remove whitespace if input formatted */
  normalizeValue = (value: string) => {
    const normalizedValue = value.replace(/\s/g, "");
    return !!normalizedValue ? normalizedValue : "0";
  };

  /** Maximize or minimize value if extreme buttons click */
  setExtreme = (event: React.MouseEvent<HTMLButtonElement>) => {
    const extremeType = event.currentTarget.name;
    const calculatedValue =
      extremeType === "max"
        ? this.props.maxPossibleValue
        : this.props.minPossibleValue;
    const formattedCalc = formatNumbersAsCurrency(calculatedValue.toFixed(2));
    this.setState({ value: formattedCalc });
    this.props.handleChange(calculatedValue);
  };

  /** Check if entering value is different than value of state */
  shouldCommitInput = (input: string) => {
    const inputAsNumber = new Decimal(input).toNumber();
    const stateValueAsNumber = new Decimal(
      this.normalizeValue(this.state.value)
    ).toNumber();
    return inputAsNumber !== stateValueAsNumber;
  };

  render() {
    // Block with buttons to increment the value
    const incrementer = this.props.isIncrementerActive && (
      <div
        className={classnames(styles.helpers, {
          [styles.outside]: !this.props.isExtremeHelpersActive,
        })}
        data-testid="incrementer"
      >
        <button
          className={styles.incrementer}
          data-testid="increase"
          name={"increase"}
          onClick={this.handleIncrement}
        >
          ▲
        </button>
        <button
          className={styles.incrementer}
          data-testid="decrease"
          name={"decrease"}
          onClick={this.handleIncrement}
        >
          ▼
        </button>
      </div>
    );
    // Block with buttons for maximize and minimize value
    const extremeHelpers = this.props.isExtremeHelpersActive && (
      <div
        className={classnames(styles.helpers, styles.outside)}
        data-testid="extremeHelpers"
      >
        <button
          className={styles.extreme}
          data-testid="max"
          name={"max"}
          onClick={this.setExtreme}
        >
          MAX
        </button>
        <button
          className={styles.extreme}
          data-testid="min"
          name={"min"}
          onClick={this.setExtreme}
        >
          MIN
        </button>
      </div>
    );

    return (
      <div className={styles.wrapper}>
        <input
          className={styles.input}
          data-testid="input"
          disabled={this.props.isDisabled}
          onChange={this.handleChangeInput}
          ref={this.inputRef}
          type="text"
          value={this.state.value}
        />
        {incrementer}
        {extremeHelpers}
      </div>
    );
  }
}

export default NumericInput;
