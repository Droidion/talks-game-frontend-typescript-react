import React, { useState } from "react";
import { WithTranslation, withTranslation } from "react-i18next";
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

type Props = ConnectedProps<typeof connector> & WithTranslation;

const Box = posed.div({
  hidden: { opacity: 0, transition: { duration: 300 } },
  visible: { opacity: 1, transition: { duration: 300 } },
});

const PageSignin: React.FC<Props> = (props) => {
  // Visibility status of sign in step content
  const [isVisible, setIsVisible] = useState(true);
  // Selected team number
  const [selectedNumber, setSelectedNumber] = useState();
  // Selected team role
  const [selectedRole, setSelectedRole] = useState();
  // Sign in step for showing different sign in control elements
  const [step, setStep] = useState(1);

  /** Fire sign in action when user submits password */
  const handlePassword = (password: string) => {
    const login = composeLogin();
    if (login) {
      props.signIn(login, password);
    }
  };

  /** Change step and apply animation */
  const moveStep = (timeoutCallback: Function) => {
    setIsVisible(false);
    setTimeout(timeoutCallback, 300);
  };

  /** Go one step further */
  const goNextStep = () => {
    moveStep(() => {
      setStep(step + 1);
      setIsVisible(true);
    });
  };

  /** Go one step earlier */
  const goPrevStep = () => {
    moveStep(() => {
      props.emptyAuthError();
      setStep(step - 1);
      setIsVisible(true);
    });
  };

  /** Set team role to state and move to next step */
  const setRole = (role: TeamRole) => {
    setSelectedRole(role);
    goNextStep();
  };

  /** Set team number to state and move to next step */
  const setNumber = (num: number) => {
    setSelectedNumber(num);
    goNextStep();
  };

  /** Construct login from team role and team number */
  const composeLogin = (): string | undefined => {
    if (!selectedRole || !selectedNumber) return undefined;
    return selectedRole + selectedNumber;
  };

  /** Back button to return one step back */
  const backButton = () => {
    return (
      <div className={styles.buttonBack}>
        <ButtonAuth
          handleClick={() => goPrevStep()}
          isLoading={false}
          text={props.t("Back")}
        />
      </div>
    );
  };

  /** Step with team role selection */
  const roleSelectors = () => {
    return (
      <Box className={styles.selectorList} pose={isVisible ? "visible" : "hidden"}>
        {[TeamRole.Supplier, TeamRole.Consumer].map((el) => (
          <div key={el} data-testid={el} className={styles.selectorEl}>
            <TeamRoleSelector handleClick={setRole} isSelected={false} role={el} />
          </div>
        ))}
      </Box>
    );
  };

  /** Step with team number selection */
  const numberSelectors = () => {
    return (
      <Box className={styles.selectorGroup} pose={isVisible ? "visible" : "hidden"}>
        <SelectedTeam role={selectedRole} number={selectedNumber} />
        <div className={styles.selectorList}>
          {[1, 2, 3, 4, 5].map((num) => (
            <div
              className={styles.selectorEl}
              data-testid={"number_" + num}
              key={num}
            >
              <TeamNumberSelector
                handleClick={setNumber}
                isSelected={false}
                number={num}
              />
            </div>
          ))}
        </div>
        {backButton()}
      </Box>
    );
  };

  /** Last step with password input */
  const passwordInput = () => {
    const { authError } = props;
    return (
      <Box className={styles.selectorGroup} pose={isVisible ? "visible" : "hidden"}>
        <SelectedTeam role={selectedRole} number={selectedNumber} />
        <InputPassword handlePassword={handlePassword} />
        {authError && (
          <div className={styles.errorPanel}>
            <ErrorPanel text={authError} />
          </div>
        )}
        {backButton()}
      </Box>
    );
  };

  /** Decide what to show on each sign in step */
  const stepContent = () => {
    switch (step) {
      case 1:
        return roleSelectors();
      case 2:
        return numberSelectors();
      default:
        return passwordInput();
    }
  };

  const { session, t } = props;
  return session ? (
    <Redirect to="/production" />
  ) : (
    <div className={styles.wrapper}>
      <h1>{t("Talks Planet")}</h1>
      <h2>{t("Business Simulation by TIM Group")}</h2>
      <div className={styles.separator}></div>
      <div className={styles.steps}>{stepContent()}</div>
    </div>
  );
};

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
