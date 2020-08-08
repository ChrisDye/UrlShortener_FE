export interface urlCreate {
    actualUrl: string;
}

export interface url {
    id: number;
    actualUrl: string;
    friendlyName: string;
    shortenedUrl: string;
    accessCount: number;
}