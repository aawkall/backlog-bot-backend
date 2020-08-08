const sql = require('./db.js');

// TODO do we need getAllByBookType, regardless of shelf? for now, it requires shelf

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

    // Set defaults if not provided - for optional fields
    // If field is not provided in an update / PUT, it will be overwritten
    if (this.cover_url == null)
        this.cover_url = '';
    if (this.current_page == null)
        this.current_page = 0;
    if (this.rating == null)
        this.rating = -1.0;
    if (this.notes == null)
        this.notes = '';
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
    // TODO - need to set current_page to 0 if comes in as null
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

            if (res.affectedRows === 0) {
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

        if (res.affectedRows === 0) {
            // Book with that bookId was not found
            result({ kind: 'not_found' }, null);
            return;
        }

        console.log('Deleted book with bookId: ', bookId);
        result(null, res);
    });
};

// Find all books on a particular shelf
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

// Find all books with a specific book_type
Book.findAllByBookType = (bookType, result) => {
    sql.query('SELECT * FROM books WHERE book_type = ?', bookType, (err, res) => {
        if (err) {
            console.log('Error finding all books with bookType: ', err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log('Found books with bookType: ', res);
            result(null, res);
            return;
        }

        // No books on bookType were found
        result({ kind: 'not_found' }, null);
    });
};

// Find all books on a particular shelf with given book type
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

        // No books of book_type on shelf were found
        result({ kind: 'not_found' }, null);
    });
};

// Pick a random book from the given shelf with the chosen book type
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

        // No books on the given shelf and book type were found
        result({ kind: 'not_found' }, null);
    });
};

module.exports = Book;
