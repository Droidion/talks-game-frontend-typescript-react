import ISession from "./ISession";

/** Part of Redux state about session */
export default interface ISessionState {
  /** Authentication error */
  authError: string | null;
  /** Session metadata */
  session: ISession | null;
}
