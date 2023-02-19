export interface AuthState {
  isAuthenticated: boolean;
  userGroups?: string[];
  userRole?: string;
}
