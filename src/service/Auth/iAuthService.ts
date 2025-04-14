export abstract class iAuthService implements iAuthService{
    static GetCredentials: () => iUserStorage | null;
}

export interface isAuthenticatedRequestBody {
  email: string;
  passwordhash: string;
}
export type UserTypes = 'Admin' | 'RegularUser';

export interface iUserStorage {
  userId?: string | undefined;
  userToken?: string;
  userRole?: UserTypes;
}

export interface UserRegisterDto {
  name?: string;
  surname?: string;
  email?: string;
  password?: string;
}