import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Country {
    name: string;
    currency: string;
    capital: string;
}
export interface backendInterface {
    getCountries(): Promise<Array<Country>>;
    searchCountries(searchTerm: string): Promise<Array<Country>>;
}
