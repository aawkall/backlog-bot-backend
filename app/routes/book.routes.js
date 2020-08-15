const bookValidator = require('./book.validator.js');

/* Routes:
   /books: POST (create)
   /books/:bookId: DELETE
   /books/random/bookType/:bookType GET (random with given bookType)
*/

module.exports = app => {
    const books = require('../controllers/book.controller.js');

    // Create new Book
    app.post('/books',
        bookValidator.validateBook,
        books.createNewBook);

    // Delete Book by bookId
    app.delete('/books/:bookId',
        bookValidator.validateBookId,
        books.deleteBook);

    // Get random book with specific book type
    app.get('/books/random/bookType/:bookType',
        bookValidator.validateBookType,
        books.getRandomBookWithType);
};
