import classnames from "classnames";
import { Decimal } from "decimal.js";
import React, { useEffect, useState } from "react";

import formatNumbersAsCurrency from "../../lib/formatNumbersAsCurrency";
import styles from "./numeric-input.module.scss";

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

const NumericInput: React.FC<INumericInputProps> = ({
  handleChange,
  incrementalAmount,
  initialValue,
  isDisabled,
  isExtremeHelpersActive,
  isIncrementerActive,
  maxPossibleValue = new Decimal(0),
  minPossibleValue = new Decimal(0),
}) => {
  const inputRef: React.RefObject<HTMLInputElement> = React.createRef();
  const [position, setPosition] = useState();
  const [value, setvalue] = useState(
    formatNumbersAsCurrency(initialValue.toFixed(2))
  );

  /** Clamp an value within a minPossibleValue and maxPossibleValue */
  const clamp = (input: string) => {
    const inputAsDecimal = new Decimal(input);
    return Decimal.min(
      Decimal.max(inputAsDecimal, minPossibleValue),
      maxPossibleValue
    );
  };

  /** Return proper cursor position if value formatted */
  const calculateCursorPosition = (
    input: string,
    formatted: string,
    currentPosition: number | null
  ) => {
    const shift = formatted.length - input.length;
    // If current position = 0 and shift = -1 Math.max prevent moving cursor to end
    return currentPosition !== null ? Math.max(currentPosition + shift, 0) : shift;
  };

  useEffect(() => {
    if (inputRef.current) {
      // Set cursor position after rendering
      inputRef.current.selectionStart = position;
      inputRef.current.selectionEnd = position;
    }
  });

  /** Event handler when user change input value  */
  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = normalizeValue(event.target.value);

    if (hasProperFormat(inputValue)) {
      const position = event.target.selectionStart;
      const formattedInput = formatNumbersAsCurrency(inputValue);

      if (shouldCommitInput(inputValue)) {
        const calculatedValue = clamp(inputValue);
        const formattedCalcValue = formatNumbersAsCurrency(
          calculatedValue.toFixed(2)
        );

        setvalue(formattedCalcValue);
        setPosition(
          calculateCursorPosition(event.target.value, formattedCalcValue, position)
        );

        handleChange(calculatedValue);
      } else {
        setvalue(formattedInput);
        setPosition(position);
      }
    }
  };

  /** Increase or decrease value if incremental buttons click */
  const handleIncrement = (event: React.MouseEvent<HTMLButtonElement>) => {
    const increment =
      event.currentTarget.name === "increase"
        ? incrementalAmount
        : incrementalAmount.neg();
    const currentValue = normalizeValue(value);

    const calculatedValue = clamp(
      new Decimal(currentValue).add(increment).toString()
    );
    const formattedCalc = formatNumbersAsCurrency(calculatedValue.toFixed(2));

    setvalue(formattedCalc);
    handleChange(calculatedValue);
  };

  /** Check if the user enters only numbers. Only two digits after dot are allowed */
  const hasProperFormat = (input: string) => {
    return input.match(/(^(\d+(\.?\d{0,2})?)?$)/) !== null;
  };

  /** Remove whitespace if input formatted */
  const normalizeValue = (value: string) => {
    const normalizedValue = value.replace(/\s/g, "");
    return !!normalizedValue ? normalizedValue : "0";
  };

  /** Maximize or minimize value if extreme buttons click */
  const setExtreme = (event: React.MouseEvent<HTMLButtonElement>) => {
    const extremeType = event.currentTarget.name;
    const calculatedValue =
      extremeType === "max" ? maxPossibleValue : minPossibleValue;
    const formattedCalc = formatNumbersAsCurrency(calculatedValue.toFixed(2));
    setvalue(formattedCalc);
    handleChange(calculatedValue);
  };

  /** Check if entering value is different than value of state */
  const shouldCommitInput = (input: string) => {
    const inputAsNumber = new Decimal(input).toNumber();
    const stateValueAsNumber = new Decimal(normalizeValue(value)).toNumber();
    return inputAsNumber !== stateValueAsNumber;
  };

  // Block with buttons to increment the value
  const incrementer = isIncrementerActive && (
    <div
      className={classnames(styles.helpers, {
        [styles.outside]: !isExtremeHelpersActive,
      })}
      data-testid="incrementer"
    >
      <button
        className={styles.incrementer}
        data-testid="increase"
        name={"increase"}
        onClick={handleIncrement}
      >
        ▲
      </button>
      <button
        className={styles.incrementer}
        data-testid="decrease"
        name={"decrease"}
        onClick={handleIncrement}
      >
        ▼
      </button>
    </div>
  );
  // Block with buttons for maximize and minimize value
  const extremeHelpers = isExtremeHelpersActive && (
    <div
      className={classnames(styles.helpers, styles.outside)}
      data-testid="extremeHelpers"
    >
      <button
        className={styles.extreme}
        data-testid="max"
        name={"max"}
        onClick={setExtreme}
      >
        MAX
      </button>
      <button
        className={styles.extreme}
        data-testid="min"
        name={"min"}
        onClick={setExtreme}
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
        disabled={isDisabled}
        onChange={handleChangeInput}
        ref={inputRef}
        type="text"
        value={value}
      />
      {incrementer}
      {extremeHelpers}
    </div>
  );
};

export default NumericInput;
