import { addBookHandler, getAllBooksHandler, getBookByIdHandler, updateBookHandler } from "./handler.js";

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBookHandler,
    }, 
    {
        method: 'GET',
        path: '/books',
        handler: getAllBooksHandler,
    }, 
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: getBookByIdHandler,
    },
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: updateBookHandler,
    }
];

export default routes;