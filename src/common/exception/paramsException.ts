export class ParamsException extends Error {
    constructor(message: string, public errorCode?: string) {
        super(message);
    }
}