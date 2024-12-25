export enum Color {
    GREEN = "GREEN",
    BLUE = "BLUE",
    ORANGE = "ORANGE",
    WHITE = "WHITE",
}

export enum Position {
    MANAGER = "MANAGER",
    LABORER = "LABORER",
    HEAD_OF_DIVISION = "HEAD_OF_DIVISION",
    LEAD_DEVELOPER = "LEAD_DEVELOPER",
    BAKER = "BAKER",
}

export enum Status {
    HIRED = "HIRED",
    FIRED = "FIRED",
    RECOMMENDED_FOR_PROMOTION = "RECOMMENDED_FOR_PROMOTION",
    PROBATION = "PROBATION", 
}

export type Location = {
    id: number;
    x: number;
    y: number;
    name: string;
    ownerId: number;
    isEditableByAdmin: boolean;
};

export type Person = {
    id: number;
    eyeColor: Color;
    hairColor: Color;
    locationId: number;
    height: number;
    weight: number;
    passportID: string;
    ownerId: number;
    isEditableByAdmin: boolean;
};

export type Organization = {
    id: number;
    zipCode: string;
    annualTurnover: number;
    employeesCount: number;
    fullName: string;
    rating: number;
    ownerId: number;
    isEditableByAdmin: boolean;
};

export type Coordinates = {
    x: number;
    y: number;
};

export type Worker = {
    id: number;
    name: string;
    coordinates: Coordinates;
    creationDate: string;
    organizationId: number;
    salary: number;
    rating: number;
    position: Position;
    status: Status;
    personId: number;
    ownerId: number;
    isEditableByAdmin: boolean;
};
