/* Routes:
   /books: GET (by shelf, by book_type and shelf), POST (create)
   /books/:bookId: GET, PUT, DELETE
*/

module.exports = app => {
    const books = require('../controllers/book.controller.js');

    // Create new Book
    app.post('/books', books.createNewBook);

    // Update Book by bookId
    app.put('/books/:bookId', books.updateBook);

    // Delete Book by bookId
    app.delete('/books/:bookId', books.deleteBook);

    // Get all books on a particular shelf
    app.get('/books/shelf/:shelf', books.getBooksOnShelf);

    // Get all books on a particular shelf, filtered by book type
    app.get('/books/shelf/:shelf/bookType/:bookType', books.getBooksOnShelfWithType);

    // Get random book on WantToRead shelf with specific book type
    app.get('/books/random/bookType/:bookType', books.getRandomBookWithType);
};
