export enum AdminRequestStatus {
    ACCEPTED = "ACCEPTED",
    REJECTED = "REJECTED",
    PENDING = "PENDING",
}

export enum ChangeType {
    CREATION = "CREATION",
    UPDATE = "UPDATE",
    DELETION = "DELETION",
}

export type AdminRequest = {
    id: number;
    userId: number;
    status: AdminRequestStatus;
};

export type NewAdminRequest = {
    username: string;
}

export type Log = {
    id: number;
    username: string;
    userId: number;
    workerName: string;
    workerId: number;
    time: string;
    changeType: ChangeType;
}