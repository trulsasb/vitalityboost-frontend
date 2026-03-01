export interface SessionUser {
  id: string;
  email: string;
  name?: string;
  roles?: string[];
}

export interface Session {
  user: SessionUser | null;
  expiresAt: string | null;
}

export interface SessionResponse {
  session: Session | null;
}
