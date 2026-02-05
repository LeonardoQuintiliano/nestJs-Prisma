export interface IExternalBookService {
    importBookData(isbn: string, userId: string): Promise<any>;
}