import React from "react";
import { withTranslation, WithTranslation } from "react-i18next";
import { connect, ConnectedProps } from "react-redux";

import { emptyAuthError } from "../../../redux/session/session.actions";
import ButtonAuth from "../button-auth/button-auth.component";
import styles from "./input-password.module.scss";
import { RootState } from "../../../redux/root-reducer";

interface IInputPasswordProps extends WithTranslation {
  handlePassword: (password: string) => void;
}

interface IInputPasswordState {
  errorEmptied: boolean;
  isLoading: boolean;
  password: string;
}

type AllProps = ConnectedProps<typeof connector> &
  WithTranslation &
  IInputPasswordProps;

class InputPassword extends React.Component<AllProps, IInputPasswordState> {
  constructor(props: AllProps) {
    super(props);
    this.state = {
      errorEmptied: false,
      isLoading: false,
      password: "",
    };
  }
  componentDidUpdate(prevProps: AllProps) {
    if (prevProps.authError !== this.props.authError && this.props.authError) {
      this.setState({ isLoading: false });
    }
  }
  handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: event.target.value });
    this.setState({ isLoading: false });
    if (!this.state.errorEmptied) {
      this.props.emptyAuthError();
      this.setState({ errorEmptied: true });
    }
  };
  submitPassword = () => {
    this.setState({ errorEmptied: false });
    this.setState({ isLoading: true });
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
            isLoading={this.state.isLoading}
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

const mapStateToProps = (state: RootState) => ({
  authError: state.session.authError,
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(withTranslation()(InputPassword));
