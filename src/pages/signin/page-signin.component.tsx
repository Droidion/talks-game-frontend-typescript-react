import React from "react";
import { withTranslation, WithTranslation } from "react-i18next";
import posed from "react-pose";
import { connect, ConnectedProps } from "react-redux";
import { Redirect } from "react-router-dom";

import ErrorPanel from "../../components/auth/error-panel/error-panel.component";
import InputPassword from "../../components/auth/input-password/input-password.component";
import TeamNumberSelector from "../../components/auth/team-number-selector/team-number-selector.component";
import TeamRoleSelector from "../../components/auth/team-role-selector/team-role-selector.component";
import { RootState } from "../../redux/root-reducer";
import { signIn, emptyAuthError } from "../../redux/session/session.actions";
import ISessionState from "../../types/ISessionState";
import styles from "./page-signin.module.scss";
import ButtonAuth from "../../components/auth/button-auth/button-auth.component";

interface IPageSigninState {
  isVisible: boolean;
  selectedNumber: number;
  selectedRole: string;
  step: number;
}

const Box = posed.div({
  hidden: { opacity: 0, transition: { duration: 300 } },
  visible: { opacity: 1, transition: { duration: 300 } },
});

class PageSignin extends React.Component<
  ConnectedProps<typeof connector> & WithTranslation,
  IPageSigninState
> {
  constructor(props: ConnectedProps<typeof connector> & WithTranslation) {
    super(props);
    this.state = {
      isVisible: true,
      selectedNumber: 0,
      selectedRole: "",
      step: 1,
    };
  }

  handlePassword = (password: string) => {
    this.props.signIn(this.composeLogin(), password);
  };

  goNextStep = () => {
    this.setState({ isVisible: false });
    setTimeout(() => {
      this.setState({ step: this.state.step + 1, isVisible: true });
    }, 300);
  };

  goPrevStep = () => {
    this.setState({ isVisible: false });
    setTimeout(() => {
      this.props.emptyAuthError();
      this.setState({ step: this.state.step - 1, isVisible: true });
    }, 300);
  };

  setRole = (role: string) => {
    this.setState({ selectedRole: role });
    this.goNextStep();
  };

  setNumber = (num: number) => {
    this.setState({ selectedNumber: num });
    this.goNextStep();
  };

  composeLogin = (): string => this.state.selectedRole + this.state.selectedNumber;

  backButton = () => {
    return (
      <div className={styles.buttonBack}>
        <ButtonAuth
          text={this.props.t("Back")}
          isLoading={false}
          handleClick={() => this.goPrevStep()}
        />
      </div>
    );
  };

  roleSelectors = () => {
    return (
      <Box
        className={styles.selectorList}
        pose={this.state.isVisible ? "visible" : "hidden"}
      >
        {["supplier", "consumer"].map((el) => (
          <div key={el} className={styles.selectorEl}>
            <TeamRoleSelector
              handleClick={this.setRole}
              isSelected={false}
              role={el}
            />
          </div>
        ))}
      </Box>
    );
  };

  numberSelectors = () => {
    return (
      <Box
        className={styles.selectorGroup}
        pose={this.state.isVisible ? "visible" : "hidden"}
      >
        <div className={styles.selectorList}>
          {[1, 2, 3, 4, 5].map((num) => (
            <div key={num} className={styles.selectorEl}>
              <TeamNumberSelector
                handleClick={this.setNumber}
                isSelected={false}
                number={num}
              />
            </div>
          ))}
        </div>
        {this.backButton()}
      </Box>
    );
  };

  passwordInput = () => {
    return (
      <Box
        className={styles.selectorGroup}
        pose={this.state.isVisible ? "visible" : "hidden"}
      >
        <InputPassword handlePassword={this.handlePassword} />
        {this.props.authError && (
          <div className={styles.errorPanel}>
            <ErrorPanel text={this.props.authError} />
          </div>
        )}
        {this.backButton()}
      </Box>
    );
  };

  stepContent = () => {
    switch (this.state.step) {
      case 1:
        return this.roleSelectors();
      case 2:
        return this.numberSelectors();
      default:
        return this.passwordInput();
    }
  };

  render() {
    return this.props.session ? (
      <Redirect to="/" />
    ) : (
      <div className={styles.wrapper}>
        <h1>{this.props.t("Talks Planet")}</h1>
        <h2>{this.props.t("Business Simulation by TIM Group")}</h2>
        <div className={styles.separator}></div>
        <div className={styles.steps}>{this.stepContent()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState): ISessionState => ({
  authError: state.session.authError,
  session: state.session.session,
});

const mapDispatchToProps = {
  emptyAuthError: () => emptyAuthError(),
  signIn: (login: string, password: string) => signIn(login, password),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

/**
 * Page where user can sign in
 *
 * @visibleName PageSignin
 */
export default connector(withTranslation()(PageSignin));
