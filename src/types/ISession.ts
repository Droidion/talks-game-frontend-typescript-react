export default interface ISession {
  token: string;
  team_number: number;
  team_type: string;
  is_commander: boolean;
  created_at: string;
  updated_at: string;
}
