export enum Order {
    asc,
    desc,
}

export type Option = {
    value: string | number;
    label: string;
};

export type EnumLike = Record<string, string | number>;
