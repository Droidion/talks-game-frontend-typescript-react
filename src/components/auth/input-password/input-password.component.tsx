import { TFunction } from "i18next";
import React from "react";
import { withTranslation, WithTranslation } from "react-i18next";

import ButtonAuth from "../button-auth/button-auth.component";
import styles from "./input-password.module.scss";
import { emptyAuthError } from "../../../redux/session/session.actions";
import { connect } from "react-redux";

interface IInputPasswordProps extends WithTranslation {
  t: TFunction;
  handlePassword: Function;
  emptyAuthError: () => void;
}

interface IInputPasswordState {
  errorEmptied: boolean;
  password: string;
}

class InputPassword extends React.Component<
  IInputPasswordProps,
  IInputPasswordState
> {
  constructor(props: IInputPasswordProps) {
    super(props);
    this.state = {
      errorEmptied: false,
      password: "",
    };
  }
  handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: event.target.value });
    if (!this.state.errorEmptied) {
      this.props.emptyAuthError();
      this.setState({ errorEmptied: true });
    }
  };
  submitPassword = () => {
    this.setState({ errorEmptied: false });
    this.props.handlePassword(this.state.password);
  };
  handleKeyPressed = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      this.submitPassword();
    }
  };
  render() {
    return (
      <div className={styles.wrapper}>
        <input
          onChange={this.handleChangePassword}
          onKeyPress={this.handleKeyPressed}
          className={styles.input}
          autoFocus
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

const mapDispatchToProps = {
  emptyAuthError: () => emptyAuthError(),
};

const connector = connect(null, mapDispatchToProps);

export default connector(withTranslation()(InputPassword));
