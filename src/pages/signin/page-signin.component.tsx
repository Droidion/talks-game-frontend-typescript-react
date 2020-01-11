import { TFunction } from "i18next";
import React from "react";
import { withTranslation, WithTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import ErrorPanel from "../../components/auth/error-panel/error-panel.component";
import InputPassword from "../../components/auth/input-password/input-password.component";
import TeamNumberSelector from "../../components/auth/team-number-selector/team-number-selector.component";
import TeamRoleSelector from "../../components/auth/team-role-selector/team-role-selector.component";
import { RootState } from "../../redux/root-reducer";
import { signIn } from "../../redux/session/session.actions";
import ISession from "../../types/ISession";
import ISessionState from "../../types/ISessionState";
import { SessionActionTypes } from "../../types/SessionActionTypes";
import styles from "./page-signin.module.scss";

interface IPageSigninProps extends WithTranslation {
  t: TFunction;
  signIn: (login: string, password: string) => SessionActionTypes;
  session: ISession | null;
  authError: string | null;
}

interface IPageSigninState {
  step: number;
  selectedRole: string;
  selectedNumber: number;
}

class PageSignin extends React.Component<IPageSigninProps, IPageSigninState> {
  constructor(props: IPageSigninProps) {
    super(props);
    this.state = {
      step: 1,
      selectedRole: "",
      selectedNumber: 0,
    };
  }

  handlePassword = (password: string) => {
    this.props.signIn(this.composeLogin(), password);
  };

  goNextStep = () => {
    this.setState({ step: this.state.step + 1 });
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

  roleSelectors = () => {
    return (
      <div className={styles.selectorList}>
        {["supplier", "consumer"].map((el) => (
          <div key={el} className={styles.selectorEl}>
            <TeamRoleSelector
              handleClick={this.setRole}
              isSelected={false}
              role={el}
            />
          </div>
        ))}
      </div>
    );
  };

  numberSelectors = () => {
    return (
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
    );
  };

  stepContent = () => {
    switch (this.state.step) {
      case 1:
        return this.roleSelectors();
      case 2:
        return this.numberSelectors();
      default:
        return <InputPassword handlePassword={this.handlePassword} />;
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
        <div className={styles.steps}>
          {this.stepContent()}
          {this.props.authError && (
            <div className={styles.errorPanel}>
              <ErrorPanel text={this.props.authError} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState): ISessionState => ({
  authError: state.session.authError,
  session: state.session.session,
});

const mapDispatchToProps = {
  signIn: (login: string, password: string) => signIn(login, password),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(withTranslation()(PageSignin));
