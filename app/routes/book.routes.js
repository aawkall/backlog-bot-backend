const bookValidator = require('./book.validator.js');

/* Routes:
   /books: POST (create)
   /books/:bookId: GET, PUT (update), DELETE
   /books/shelf/:shelf: GET (by shelf)
   /books/shelf/:shelf/bookType/:bookType: GET (by shelf and bookType)
   /books/random/bookType/:bookType GET (from WantToRead shelf with bookType)
*/

module.exports = app => {
    const books = require('../controllers/book.controller.js');

    // Create new Book
    app.post('/books',
        bookValidator.validateBook,
        books.createNewBook);

    // Get Book with bookId
    app.get('/books/:bookId',
        bookValidator.validateBookId,
        books.getBookById);

    // Update Book by bookId
    app.put('/books/:bookId',
        bookValidator.validateBookId, bookValidator.validateBook,
        books.updateBook);

    // Delete Book by bookId
    app.delete('/books/:bookId',
        bookValidator.validateBookId,
        books.deleteBook);

    // Get all books on a particular shelf
    app.get('/books/shelf/:shelf',
        bookValidator.validateShelf,
        books.getBooksOnShelf);

    // Get all books on a particular shelf, filtered by book type
    app.get('/books/shelf/:shelf/bookType/:bookType',
        bookValidator.validateShelf, bookValidator.validateBookType,
        books.getBooksOnShelfWithType);

    // Get random book on WantToRead shelf with specific book type
    app.get('/books/random/bookType/:bookType',
        bookValidator.validateBookType,
        books.getRandomBookWithType);
};
