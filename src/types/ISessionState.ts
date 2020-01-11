import ISession from "./ISession";

export default interface ISessionState {
  authError: string | null;
  session: ISession | null;
}
