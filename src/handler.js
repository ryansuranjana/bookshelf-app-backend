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

export { addBookHandler };