import React, { useEffect, useState } from "react";
import { WithTranslation, withTranslation } from "react-i18next";
import { connect, ConnectedProps } from "react-redux";

import { RootState } from "../../../redux/root-reducer";
import { emptyAuthError } from "../../../redux/session/session.actions";
import ButtonAuth from "../button-auth/button-auth.component";
import styles from "./input-password.module.scss";

interface IInputPasswordProps extends WithTranslation {
  /** Event handler when user clicks the button */
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

const InputPassword: React.FC<AllProps> = (props) => {
  const [errorEmptied, setErrorEmptied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (props.authError) {
      setIsLoading(false);
    }
  }, [props.authError]);
  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setIsLoading(false);
    if (!errorEmptied) {
      props.emptyAuthError();
      setErrorEmptied(true);
    }
  };
  const submitPassword = () => {
    setErrorEmptied(false);
    setIsLoading(true);
    props.handlePassword(password);
  };
  const handleKeyPressed = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      submitPassword();
    }
  };
  return (
    <div className={styles.wrapper}>
      <input
        data-testid="inputPassword"
        onChange={handleChangePassword}
        onKeyPress={handleKeyPressed}
        className={styles.input}
        autoFocus
        type="password"
        placeholder={props.t("Password")}
      />
      <div data-testid="buttonAuth" className={styles.btnContainer}>
        <ButtonAuth
          handleClick={submitPassword}
          isLoading={isLoading}
          text={props.t("Sign in")}
        />
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  emptyAuthError: () => emptyAuthError(),
};

const mapStateToProps = (state: RootState) => ({
  authError: state.session.authError,
});

const connector = connect(mapStateToProps, mapDispatchToProps);

/**
 * Input field with a button of a password type. Used in the authentication layout
 *
 * @visibleName InputPassword
 */
export default connector(withTranslation()(InputPassword));
