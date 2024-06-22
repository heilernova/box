export interface IResponseAPI {
    name: string;
    version: string;
    statusCode: number;
    developer: string | { name: string, homepage: string };
    data: any;
    links: string[];
}

export interface IResponseErrorAPI {
    name: string;
    version: string;
    statusCode: number;
    developer: string | { name: string, homepage: string };
    message: string;
    detail: any;
    links: string[];
}