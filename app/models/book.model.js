// TODO: consider adding a column for notes like in games, that allows you to have "first" to know when to not select a book yet

const sql = require('./db.js');

// Constructor
const Book = function(book) {
    this.title = book.title;
    this.author = book.author;
    this.isbn = book.isbn;
    this.cover_url = book.cover_url;
    this.book_type = book.book_type;
    this.shelf = book.shelf;
    this.current_page = book.current_page;
    this.total_pages = book.total_pages;
    this.percentage_complete = book.percentage_complete;
    this.rating = book.rating;
    this.notes = book.notes;
};

// Create new Book
Book.create = (book, result) => {
    book.percentage_complete = Math.round(book.current_page / book.total_pages * 100);
    sql.query(
        'INSERT INTO books SET title = ?, author = ?, isbn = ?, cover_url = ?, book_type = ?, shelf = ?, current_page = ?, total_pages = ?, percentage_complete = ?, rating = ?, notes = ?',
        [book.title, book.author, book.isbn, book.cover_url, book.book_type, book.shelf, book.current_page, book.total_pages, book.percentage_complete, book.rating, book.notes],
        (err, res) => {
        if (err) {
            console.log('Error creating new book: ', err);
            result(err, null);
            return;
        }

        console.log('Created new book: ', { id: res.insertId, ...book });
        result(null, { id: res.insertId, ...book });
    });
};

// Find Book by bookId
Book.findById = (bookId, result) => {
    sql.query('SELECT * FROM books WHERE id = ?', bookId, (err, res) => {
        if (err) {
            console.log('Error finding book with given id : ', err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log('Found book with given id: ', res);
            result(null, res[0]);
            return;
        }

        // Book with that id was not found
        result({ kind: 'not_found' }, null);
    });
};

// Update Book by bookId
Book.updateById = (bookId, book, result) => {
    book.percentage_complete = Math.round(book.current_page / book.total_pages * 100);
    sql.query(
        'UPDATE books SET title = ?, author = ?, isbn = ?, cover_url = ?, book_type = ?, shelf = ?, current_page = ?, total_pages = ?, percentage_complete = ?, rating = ?, notes = ? WHERE id = ?',
        [book.title, book.author, book.isbn, book.cover_url, book.book_type, book.shelf, book.current_page, book.total_pages, book.percentage_complete, book.rating, book.notes, bookId],
        (err, res) => {
            if (err) {
                console.log('Error updating book: ', err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // Book with that ID was not found
                result({ kind: 'not_found' }, null);
                return;
            }

            console.log('Updated book: ', { id: bookId, ...book });
            result(null, { id: bookId, ...book });
    });
};

// Delete Book by bookId
Book.delete = (bookId, result) => {
    sql.query('DELETE FROM books WHERE id = ?', bookId, (err, res) => {
        if (err) {
            console.log('Error deleting book: ', err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // Book with that bookId was not found
            result({ kind: 'not_found' }, null);
            return;
        }

        console.log('Deleted book with bookId: ', bookId);
        result(null, res);
    });
};

// FindAllByShelf
Book.findAllByShelf = (shelf, result) => {
    sql.query('SELECT * FROM books WHERE shelf = ?', shelf, (err, res) => {
        if (err) {
            console.log('Error finding all books by shelf: ', err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log('Found books on shelf: ', res);
            result(null, res);
            return;
        }

        // No books on shelf were found
        result({ kind: 'not_found' }, null);
    });
};

// FindAllByBookTypeAndShelf
Book.findAllByBookTypeAndShelf = (bookType, shelf, result) => {
    sql.query('SELECT * FROM books WHERE book_type = ? AND shelf = ?', [bookType, shelf], (err, res) => {
        if (err) {
            console.log('Error finding all books by book_type and shelf: ', err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log('Found books with specified book_type and shelf: ', res);
            result(null, res);
            return;
        }

        // No books of book_type were found
        result({ kind: 'not_found' }, null);
    });
};

// FindRandomByBookTypeAndShelf
Book.findRandomByBookTypeAndShelf = (bookType, shelf, result) => {
    sql.query('SELECT * FROM books WHERE book_type = ? AND shelf = ? ORDER BY RAND() LIMIT 1', [bookType, shelf], (err, res) => {
        if (err) {
            console.log('Error finding all books by book_type and shelf: ', err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log('Found books with specified book_type and shelf: ', res);
            result(null, res);
            return;
        }

        // No books of book_type were found
        result({ kind: 'not_found' }, null);
    });
};

module.exports = Book;
