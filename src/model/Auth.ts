export enum Role {
    ADMIN = "ADMIN",
    USER = "USER",
}

export type Token = {
    token: string;
};

export type User = {
    id: number;
    username: string;
    role: Role;
};
