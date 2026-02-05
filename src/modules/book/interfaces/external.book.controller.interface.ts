export interface IExternalBookController {
    importBookData(isbn: string, userId: string): Promise<any>;
}