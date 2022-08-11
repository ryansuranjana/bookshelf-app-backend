import { nanoid } from 'nanoid';
import books from './books.js';

const addBookHandler = (request, h) => {
    try {
        const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

        const id = nanoid(16);
        const finished = pageCount === readPage;
        const insertedAt = new Date().toISOString();
        const updatedAt = insertedAt;

        if(!name) {
            return h.response({
                "status": "fail",
                "message": "Gagal menambahkan buku. Mohon isi nama buku", 
            }).type('application/json').code(400);
        } else if (readPage > pageCount) {
            return h.response({
                "status": "fail",
                "message": "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
            }).type('application/json').code(400);
        }

        const newBook = { id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt };

        books.push(newBook);

        return h.response({
            "status" : "success",
            "message": "Buku berhasil ditambahkan",
            "data" : {
                "bookId": id,
            },
        }).type('application/json').code(201);
    } catch (error) {
        return h.response({
            "status": "error",
            "message": "Buku gagal ditambahkan",
        }).type('application/json').code(500);
    }
}

const getAllBooksHandler = (request, h) => {
    const filterBook = [];
    for (const book of books) {
        filterBook.push({
            "id" : book.id,
            "name" : book.name,
            "publisher" : book.publisher,
        });
    }
    return h.response({
        "status": "success",
        "data": {
            "books": filterBook
        },
    }).type('application/json').code(200);
}

const getBookByIdHandler = (request, h) => {
    const { bookId } = request.params;
    const book = books.find(book => book.id === bookId);

    if(!book) {
        return h.response({
            "status": "fail",
            "message": "Buku tidak ditemukan"
        }).type('application/json').code(404);
    }

    return h.response({
        "status": "success",
        "data": {
            book
        }
    })
}

const updateBookHandler = (request, h) => {
    try {
        const { bookId } = request.params;
        const book = books.find(book => book.id === bookId);
        const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

        if(!book) {
            return h.response({
                "status": "fail",
                "message": "Gagal memperbarui buku. Id tidak ditemukan"
            }).type('application/json').code(404);
        } else if(!name) {
            return h.response({
                "status": "fail",
                "message": "Gagal memperbarui buku. Mohon isi nama buku"
            }).type('application/json').code(400);
        } else if (readPage > pageCount) {
            return h.response({
                "status": "fail",
                "message": "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
            }).type('application/json').code(400);
        }

        book.name = name;
        book.year = year;
        book.author = author;
        book.summary = summary;
        book.publisher = publisher;
        book.pageCount = pageCount;
        book.readPage = readPage;
        book.reading = reading;
        book.updatedAt = new Date().toISOString();

        const bookIndex = books.findIndex(book => book.id === bookId);
        books[bookIndex] = book;
        return h.response({
            "status": "success",
            "message": "Buku berhasil diperbarui"
        }).type('application/json').code(200);
    } catch (error) {
        return h.response({
            "status": "error",
            "message": "Buku gagal diperbarui",
        }).type('application/json').code(500);
    }
}

const deleteBookHandler = (request, h) => {
    try {
        const { bookId } = request.params;
        const book = books.find(book => book.id === bookId);

        if(!book) {
            return h.response({
                "status": "fail",
                "message": "Buku gagal dihapus. Id tidak ditemukan"
            }).type('application/json').code(404);
        }

        const bookIndex = books.findIndex(book => book.id === bookId);
        books.splice(bookIndex, 1);

        return h.response({
            "status": "success",
            "message": "Buku berhasil dihapus"
        }).type('application/json').code(200);
    } catch (error) {
        return h.response({
            "status": "error",
            "message": "Buku gagal dihapus",
        }).type('application/json').code(500);
    }
}
export { addBookHandler, getAllBooksHandler, getBookByIdHandler, updateBookHandler, deleteBookHandler };