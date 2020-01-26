import React from "react";
import { withTranslation, WithTranslation } from "react-i18next";
import posed from "react-pose";
import { connect, ConnectedProps } from "react-redux";
import { Redirect } from "react-router-dom";

import ButtonAuth from "../../components/auth/button-auth/button-auth.component";
import ErrorPanel from "../../components/auth/error-panel/error-panel.component";
import InputPassword from "../../components/auth/input-password/input-password.component";
import SelectedTeam from "../../components/auth/selected-team/selected-team.component";
import TeamNumberSelector from "../../components/auth/team-number-selector/team-number-selector.component";
import TeamRoleSelector from "../../components/auth/team-role-selector/team-role-selector.component";
import { RootState } from "../../redux/root-reducer";
import { emptyAuthError, signIn } from "../../redux/session/session.actions";
import ISessionState from "../../types/ISessionState";
import TeamRole from "../../types/TeamRole";
import styles from "./page-signin.module.scss";

interface State {
  /** Visibility status of sign in step content */
  isVisible: boolean;
  /** Selected team number */
  selectedNumber: number | undefined;
  /** Selected team role */
  selectedRole: TeamRole | undefined;
  /** Sign in step for showing different sign in control elements */
  step: number;
}

type Props = ConnectedProps<typeof connector> & WithTranslation;

const Box = posed.div({
  hidden: { opacity: 0, transition: { duration: 300 } },
  visible: { opacity: 1, transition: { duration: 300 } },
});

class PageSignin extends React.Component<Props, State> {
  constructor(props: ConnectedProps<typeof connector> & WithTranslation) {
    super(props);
    this.state = {
      isVisible: true,
      selectedNumber: undefined,
      selectedRole: undefined,
      step: 1,
    };
  }

  /** Fire sign in action when user submits password */
  handlePassword = (password: string) => {
    const login = this.composeLogin();
    if (login) {
      this.props.signIn(login, password);
    }
  };

  /** Change step and apply animation */
  moveStep = (timeoutCallback: Function) => {
    this.setState({ isVisible: false });
    setTimeout(timeoutCallback, 300);
  };

  /** Go one step further */
  goNextStep = () => {
    this.moveStep(() => {
      this.setState({ step: this.state.step + 1, isVisible: true });
    });
  };

  /** Go one step earlier */
  goPrevStep = () => {
    this.moveStep(() => {
      this.props.emptyAuthError();
      this.setState({ step: this.state.step - 1, isVisible: true });
    });
  };

  /** Set team role to state and move to next step */
  setRole = (role: TeamRole) => {
    this.setState({ selectedRole: role });
    this.goNextStep();
  };

  /** Set team number to state and move to next step */
  setNumber = (num: number) => {
    this.setState({ selectedNumber: num });
    this.goNextStep();
  };

  /** Construct login from team role and team number */
  composeLogin = (): string | undefined => {
    if (!this.state.selectedRole || !this.state.selectedNumber) return undefined;
    return this.state.selectedRole + this.state.selectedNumber;
  };

  /** Back button to return one step back */
  backButton = () => {
    return (
      <div className={styles.buttonBack}>
        <ButtonAuth
          handleClick={() => this.goPrevStep()}
          isLoading={false}
          text={this.props.t("Back")}
        />
      </div>
    );
  };

  /** Step with team role selection */
  roleSelectors = () => {
    const { isVisible } = this.state;
    return (
      <Box className={styles.selectorList} pose={isVisible ? "visible" : "hidden"}>
        {[TeamRole.Supplier, TeamRole.Consumer].map((el) => (
          <div key={el} data-testid={el} className={styles.selectorEl}>
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

  /** Step with team number selection */
  numberSelectors = () => {
    const { isVisible } = this.state;
    return (
      <Box className={styles.selectorGroup} pose={isVisible ? "visible" : "hidden"}>
        <SelectedTeam
          role={this.state.selectedRole}
          number={this.state.selectedNumber}
        />
        <div className={styles.selectorList}>
          {[1, 2, 3, 4, 5].map((num) => (
            <div
              className={styles.selectorEl}
              data-testid={"number_" + num}
              key={num}
            >
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

  /** Last step with password input */
  passwordInput = () => {
    const { authError } = this.props;
    const { isVisible } = this.state;
    return (
      <Box className={styles.selectorGroup} pose={isVisible ? "visible" : "hidden"}>
        <SelectedTeam
          role={this.state.selectedRole}
          number={this.state.selectedNumber}
        />
        <InputPassword handlePassword={this.handlePassword} />
        {authError && (
          <div className={styles.errorPanel}>
            <ErrorPanel text={authError} />
          </div>
        )}
        {this.backButton()}
      </Box>
    );
  };

  /** Decide what to show on each sign in step */
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
    const { session, t } = this.props;
    return session ? (
      <Redirect to="/production" />
    ) : (
      <div className={styles.wrapper}>
        <h1>{t("Talks Planet")}</h1>
        <h2>{t("Business Simulation by TIM Group")}</h2>
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
