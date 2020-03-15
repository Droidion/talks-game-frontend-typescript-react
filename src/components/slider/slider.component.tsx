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
  const styleDefault = {
    "--min": minValue,
    "--max": maxValue,
    "--val": defaultValue,
  } as React.CSSProperties;
  const [sliderValue, setSliderValue] = useState(defaultValue);
  const [style, setStyle] = useState(styleDefault);
  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSliderValue(Number(event.target.value));
    const newStyle = { ...styleDefault, "--val": Number(event.target.value) };
    setStyle(newStyle);
    handleChange(Number(event.target.value));
  };
  return (
    <div className={styles.container}>
      <div className={styles.track} style={style}>
        <input
          className={styles.slider}
          type="range"
          min={minValue}
          max={maxValue}
          onChange={handleChangeInput}
          value={sliderValue}
          style={style}
        />
        <span className={styles.labelRange}>{sliderValue}</span>
      </div>
    </div>
  );
};

export default memo(Slider);
