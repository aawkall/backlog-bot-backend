const Book = require('../models/book.model.js');
const { validationResult } = require('express-validator');

// TODO: consider adding method that can take in multiple book types for the random selector

// Create new Book
exports.createNewBook = (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Save Book in DB
    Book.create(new Book(req.body), (err, data) => {
        if (err)
            if (err.code === 'ER_DUP_ENTRY')
                res.status(409).send({ message: 'Book with the ISBN already exists: ' + req.body.isbn });
            else
                res.status(500).send({
                    message: err.message || 'Unknown error when creating new book'
                });
        else res.status(201).send(data);
    });
};

// Get Book with given bookId
exports.getBookById = (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Find book by Id
    Book.findById(req.params.bookId, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send( {
                    message: 'Book not found with id: ' + req.params.bookId
                });
            } else {
                res.status(500).send({
                    message: 'Error getting book with id: '+ req.params.bookId
                });
            }
        } else res.send(data);
    });
}

// Update Book by bookId
exports.updateBook = (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Update Book in DB
    Book.updateById(req.params.bookId, new Book(req.body), (err, data) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY')
                res.status(409).send({ message: 'Book with the ISBN already exists: ' + req.body.isbn });
            else if (err.kind === 'not_found') {
                res.status(404).send( {
                    message: 'Book not found with id: ' + req.params.bookId
                });
            } else {
                res.status(500).send({
                    message: 'Error updating book with id: '+ req.params.bookId
                });
            }
        } else res.send(data);
    });
};

// Delete Book by bookId
exports.deleteBook = (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Delete Book from DB
    Book.delete(req.params.bookId, (err) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send( {
                    message: 'Book not found with id: ' + req.params.bookId
                });
            } else {
                res.status(500).send({
                    message: 'Error deleting book with id: '+ req.params.bookId
                });
            }
        } else res.send({ message: 'Book was deleted successfully'});
    });
};

// Get all books on a particular shelf
exports.getBooksOnShelf = (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Get all Books on given shelf from DB
    Book.findAllByShelf(req.params.shelf, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send( {
                    message: 'No books found on shelf: ' + req.params.shelf
                });
            } else {
                res.status(500).send({
                    message: 'Error retrieving books on shelf : '+ req.params.shelf
                });
            }
        } else res.send(data);
    });
};

// Get all books with a specific book type
exports.getBooksByBookType = (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Get all Books with given bookType from DB
    Book.findAllByBookType(req.params.bookType, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send( {
                    message: 'No books found with bookType: ' + req.params.bookType
                });
            } else {
                res.status(500).send({
                    message: 'Error retrieving books with bookType: '+ req.params.bookType
                });
            }
        } else res.send(data);
    });
}

// Get all books on a particular shelf, filtered by book type
exports.getBooksOnShelfWithType = (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Get all Books on given shelf filtered by bookType from DB
    Book.findAllByBookTypeAndShelf(req.params.bookType, req.params.shelf, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send( {
                    message: 'No books found on shelf: ' + req.params.shelf + ' with bookType: ' + req.params.bookType
                });
            } else {
                res.status(500).send({
                    message: 'Error retrieving books on shelf: ' + req.params.shelf + ' with bookType: ' + req.params.bookType
                });
            }
        } else res.send(data);
    });
};

// TODO: need to consider if we want to include OnHold here or not - or give the user an option to not select that
// Add query parameter for OnHold = true, then use this to pass to the DB model method to add
// "shelf = 'WantToRead' OR shelf = 'OnHold'" to the query. For now, it will only do WantToRead

// Get random book on WantToRead shelf with specific book type
exports.getRandomBookWithType = (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Get all Books on the WantToRead shelf with given bookType
    Book.findRandomByBookTypeAndShelf(req.params.bookType, 'WantToRead', (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send( {
                    message: 'No books found on WantToRead shelf with bookType: ' + req.params.bookType
                });
            } else {
                res.status(500).send({
                    message: 'Error retrieving books on WantToRead shelf with bookType: ' + req.params.bookType
                });
            }
        } else res.send(data);
    });
};
