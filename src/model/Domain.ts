export enum Color {
    GREEN,
    BLUE,
    ORANGE,
    WHITE,
}

export enum Position {
    MANAGER,
    LABORER,
    HEAD_OF_DIVISION,
    LEAD_DEVELOPER,
    BAKER,
}

export enum Status {
    HIRED,
    FIRED,
    RECOMMENDED_FOR_PROMOTION,
    PROBATION,
}

export type Location = {
    id: number;
    x: number;
    y: number;
    name: string;
    ownerId: number;
};

export type Person = {
    id: number;
    eyeColor: Color;
    hairColor: Color;
    locationId: number;
    height: number;
    weight: number;
    passportID: number;
    ownerId: number;
};

export type Organization = {
    id: number;
    zipCode: string;
    annualTurnover: number;
    employeesCount: number;
    fullName: string;
    rating: number;
    ownerId: number;
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
};
