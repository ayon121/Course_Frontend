// services/auth/user.interface.ts
export interface AuthProvider {
  provider: string;      // e.g., "credentials", "google", etc.
  providerid: string;    // provider-specific ID or email
}

export interface UserInfo {
  id: string;            // maps to _id from backend
  name: string;
  email: string;
  role: string;          // e.g., "SUPER_ADMIN", "ADMIN", "USER"
  isActive: string;      // "ACTIVE", "INACTIVE", etc.
  isVerified: boolean;
  isDelete: boolean;
  auths: AuthProvider[];
  createdAt: string;     // ISO date string
  updatedAt: string;     // ISO date string
}
