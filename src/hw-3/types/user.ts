export interface NewUser {
    login: string;
    password: string;
    age: number;
}
export interface User extends NewUser{
    id?: string;
    isDeleted: boolean;
}
