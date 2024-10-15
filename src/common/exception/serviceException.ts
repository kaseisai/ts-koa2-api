export class ServiceException extends Error {
    constructor(message: string, public errorCode?: string) {
        super(message);
    }
}