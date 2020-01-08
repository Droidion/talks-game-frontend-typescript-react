import { TFunction } from "i18next";
import React from "react";
import { withTranslation, WithTranslation } from "react-i18next";

import ButtonAuth from "../button-auth/button-auth.component";
import styles from "./input-password.module.scss";

interface IInputPasswordProps extends WithTranslation {
  t: TFunction;
  handlePassword: Function;
}

interface IInputPasswordState {
  password: string;
}

class InputPassword extends React.Component<
  IInputPasswordProps,
  IInputPasswordState
> {
  constructor(props: IInputPasswordProps) {
    super(props);
    this.state = {
      password: "",
    };
  }
  handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: event.target.value });
  };
  submitPassword = () => {
    this.props.handlePassword(this.state.password);
  };
  render() {
    return (
      <div className={styles.wrapper}>
        <input
          onChange={this.handleChangePassword}
          className={styles.input}
          type="password"
          placeholder={this.props.t("Password")}
        />
        <div className={styles.btnContainer}>
          <ButtonAuth
            handleClick={this.submitPassword}
            text={this.props.t("Sign in")}
          />
        </div>
      </div>
    );
  }
}

export default withTranslation()(InputPassword);
