const sql = require('./db.js');

// Constructor
const Book = function(book) {
    this.title = book.title;
    this.author = book.author;
    this.isbn = book.isbn;
    this.cover_url = book.cover_url;
    this.book_type = book.book_type;
    this.notes = book.notes;

    // Set defaults if not provided - for optional fields
    // If field is not provided in an update / PUT, it will be overwritten
    if (this.cover_url == null)
        this.cover_url = '';
    if (this.notes == null)
        this.notes = '';
};

// Create new Book
Book.create = (book, result) => {
    sql.query(
        'INSERT INTO books SET title = ?, author = ?, isbn = ?, cover_url = ?, book_type = ?, notes = ?',
        [book.title, book.author, book.isbn, book.cover_url, book.book_type, book.notes],
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

// Delete Book by bookId
Book.delete = (bookId, result) => {
    sql.query('DELETE FROM books WHERE id = ?', bookId, (err, res) => {
        if (err) {
            console.log('Error deleting book: ', err);
            result(null, err);
            return;
        }

        if (res.affectedRows === 0) {
            // Book with that bookId was not found
            result({ kind: 'not_found' }, null);
            return;
        }

        console.log('Deleted book with bookId: ', bookId);
        result(null, res);
    });
};

// Pick a random book with the chosen book type
Book.findRandomByBookType = (bookType, result) => {
    sql.query('SELECT * FROM books WHERE book_type = ? ORDER BY RAND() LIMIT 1', bookType, (err, res) => {
        if (err) {
            console.log('Error selecting random book with given book_type', err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log('Found random book with specified book_type: ', res);
            result(null, res);
            return;
        }

        // No books with given book_type were found
        result({ kind: 'not_found' }, null);
    });
};

module.exports = Book;
