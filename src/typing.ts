import { Countries } from './data';

export type CountryType = (typeof Countries)[number];
export type PeopleType = CountryType['people'][number];
export type AnimalType = PeopleType['animals'][number];

export enum CommandEnum {
    FILTER = 'filter',
    COUNT = 'count',
    HELP = 'help'
} 

export type ParameterType = `--${CommandEnum}`;

export type CliInputType = [ String, String, ParameterType ];