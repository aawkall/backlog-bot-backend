const Book = require('../models/book.model.js');
const { validationResult } = require('express-validator');

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

// Get random book with specific book type
exports.getRandomBookWithType = (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Get all Books with given bookType
    Book.findRandomByBookType(req.params.bookType, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send( {
                    message: 'No books found with bookType: ' + req.params.bookType
                });
            } else {
                res.status(500).send({
                    message: 'Error retrieving random book with bookType: ' + req.params.bookType
                });
            }
        } else res.send(data);
    });
};
