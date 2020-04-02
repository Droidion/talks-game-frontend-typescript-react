import React, { memo, useState } from "react";

import styles from "./slider.module.scss";

type Props = {
  /** Default value of slider */
  defaultValue: number;
  /** Callback function for returning value on change*/
  handleChange: (value: number) => void;
  /** Maximum value of the slider */
  maxValue: number;
  /** Min value of the slider */
  minValue: number;
};

/**
 * A slider for choosing numbers between lower and upper bounds.
 *
 * @visibleName Slider
 */

const Slider: React.FC<Props> = ({
  defaultValue,
  handleChange,
  maxValue,
  minValue,
}) => {
  const initialStyleVariables = {
    "--max": maxValue,
    "--min": minValue,
    "--val": defaultValue,
  } as React.CSSProperties;

  const [sliderValue, setSliderValue] = useState(defaultValue);
  const [styleVariables, setStyleVariables] = useState(initialStyleVariables);

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSliderValue(Number(event.target.value));
    const newStyle = {
      ...initialStyleVariables,
      "--val": Number(event.target.value),
    };
    setStyleVariables(newStyle);
    handleChange(Number(event.target.value));
  };

  return (
    <div className={styles.container}>
      <input
        className={styles.slider}
        data-testid="slider"
        max={maxValue}
        min={minValue}
        onChange={handleChangeInput}
        style={styleVariables}
        type="range"
        value={sliderValue}
      />
      <span className={styles.label} style={styleVariables}>
        {sliderValue}
      </span>
    </div>
  );
};

export default memo(Slider);
