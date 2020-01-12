import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

import styles from "./button-auth.module.scss";

type ButtonAuthProps = {
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isLoading: boolean;
  text: string;
};

class ButtonAuth extends React.Component<ButtonAuthProps> {
  constructor(props: ButtonAuthProps) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }
  handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    this.props.handleClick(e);
  };
  render() {
    return (
      <button
        className={styles.btn}
        disabled={this.props.isLoading}
        onClick={this.handleClick}
      >
        {this.props.isLoading ? (
          <ClipLoader size={20} color={"#2c2c2c"} loading={this.props.isLoading} />
        ) : (
          this.props.text
        )}
      </button>
    );
  }
}

export default ButtonAuth;
