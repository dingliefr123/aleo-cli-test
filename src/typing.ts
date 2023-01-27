export enum CommandEnum {
    FILTER = 'filter',
    COUNT = 'count',
    HELP = 'help'
} 

export type ParameterType = `--${CommandEnum}`;

export type CliInputType = [ String, String, ParameterType ];