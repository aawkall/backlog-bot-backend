const Book = require('../models/book.model.js');
const Validator = require('validator');

// TODO: consider adding method that can take in multiple book types for the random selector
// TODO: unit / integration tests with all validator errors and successes for this controller layer

const shelves = ['currentlyreading', 'read', 'onhold', 'wanttoread'];
const bookTypes = ['fiction', 'nonfiction', 'graphicnovel', 'selfhelp', 'professional'];

// Create new Book
exports.createNewBook = (req, res) => {
    // Validate Request body provided
    if (!(req.body instanceof Book)) {
        res.status(400).send({
            message: 'Request body must be of type Book'
        });
        return;
    }

    // Save Book in DB
    Book.create(new Book(req.body), (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || 'Unknown error when creating new book'
            });
        else res.status(201).send(data);
    });
};

// Update Book by bookId
exports.updateBook = (req, res) => {
    // Validate Request body provided
    if (!(req.body instanceof Book)) {
        res.status(400).send({
            message: 'Request body must be of type Book'
        });
        return;
    }
    // Validate bookId is an integer
    if (!Validator.isInt(req.params.bookId)) {
        res.status(400).send({
            message: 'bookId must be an integer id'
        });
        return;
    }

    // Update Book in DB
    Book.updateById(req.params.bookId, new Book(req.body), (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
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
    // Validate bookId is an integer
    if (!Validator.isInt(req.params.bookId)) {
        res.status(400).send({
            message: 'bookId must be an integer id'
        });
        return;
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
    // Validate shelf was provided and is valid value
    if (!Validator.isIn(req.params.shelf.toLowerCase(), shelves)) {
        res.status(400).send({
            message: 'shelf must be one of: ' + shelves
        });
        return;
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

// Get all books on a particular shelf, filtered by book type
exports.getBooksOnShelfWithType = (req, res) => {
    // Validate shelf was provided and is valid value
    if (!Validator.isIn(req.params.shelf.toLowerCase(), shelves)) {
        res.status(400).send({
            message: 'shelf must be one of: ' + shelves
        });
        return;
    }
    // Validate bookType was provided and is valid value
    if (!Validator.isIn(req.params.bookType.toLowerCase(), bookTypes)) {
        res.status(400).send({
            message: 'bookType must be one of: ' + bookTypes
        });
        return;
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
// If selected, do we do a different query? Or select both separately and combine the lists?
// Get random book on WantToRead shelf with specific book type
exports.getRandomBookWithType = (req, res) => {
    // Validate bookType was provided and is valid value
    if (!Validator.isIn(req.params.bookType.toLowerCase(), bookTypes)) {
        res.status(400).send({
            message: 'bookType must be one of: ' + bookTypes
        });
        return;
    }

    // Get all Books on the WantToRead shelf with given bookType
    Book.findAllByBookTypeAndShelf(req.params.bookType, 'WantToRead', (err, data) => {
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
        } else {
            // Store length of returned list, choose random number, and return that book
            let length = data.length;
            let randomIndex = Math.random(0, length);
            res.send(data[randomIndex]);
        }
    });
};
