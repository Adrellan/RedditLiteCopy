export interface IUser{
    name: string;
    userName: string;
    email: string;
    password: string;
}

export type IUserCompact = Omit<IUser,"password">;