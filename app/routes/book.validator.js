const { checkSchema } = require('express-validator');

const shelves = ['currentlyreading', 'read', 'onhold', 'wanttoread'];
const bookTypes = ['fiction', 'nonfiction', 'graphicnovel', 'selfhelp', 'professional'];
const ratings = ['0.0', '0.5', '1.0', '1.5', '2.0', '2.5', '3.0', '3.5', '4.0', '4.5', '5.0']

exports.validateBookId = checkSchema( {
   bookId: {
       in: ['params'],
       errorMessage: 'bookId must be an integer',
       isInt: true
   }
});

exports.validateShelf = checkSchema( {
    shelf: {
        in: ['params'],
        customSanitizer: {
            options: (value, { req }) => {
                return req.params.shelf.toLowerCase();
            }
        },
        isIn: {
            errorMessage: 'shelf must be one of: currentlyreading, read, onhold, or wanttoread',
            options: [shelves]
        }
    }
});

exports.validateBookType = checkSchema( {
    bookType: {
        in: ['params'],
        customSanitizer: {
            options: (value, { req }) => {
                return req.params.bookType.toLowerCase();
            }
        },
        isIn: {
            errorMessage: 'bookType must be one of: fiction, nonfiction, graphicnovel, selfhelp, or professional',
            options: [bookTypes]
        }
    }
});

exports.validateBook = checkSchema( {
    title: {
        in: ['body'],
        notEmpty: true,
        errorMessage: 'title cannot be empty'
    },
    author: {
        in: ['body'],
        notEmpty: true,
        errorMessage: 'author cannot be empty'
    },
    isbn: {
        in: ['body'],
        exists: true,
        errorMessage: 'ISBN cannot be empty',
        isISBN: {
            version: 13,
            errorMessage: 'isbn must be a valid ISBN-13 number'
        }
    },
    cover_url: {
        in: ['body'],
        optional: true,
        isURL: true,
        errorMessage: 'cover_url must be a valid URL'
    },
    book_type: {
        in: ['body'],
        exists: true,
        errorMessage: 'book_type cannot be empty',
        customSanitizer: {
            options: (value, { req }) => {
                if (req.body.book_type)
                    return req.body.book_type.toLowerCase();
            }
        },
        isIn: {
            errorMessage: 'book_type must be one of: fiction, nonfiction, graphicnovel, selfhelp, or professional',
            options: [bookTypes]
        }
    },
    shelf: {
        in: ['body'],
        exists: true,
        errorMessage: 'shelf cannot be empty',
        customSanitizer: {
            options: (value, { req }) => {
                if (req.body.shelf)
                    return req.body.shelf.toLowerCase();
            }
        },
        isIn: {
            errorMessage: 'shelf must be one of: currentlyreading, read, onhold, or wanttoread',
            options: [shelves]
        }
    },
    total_pages: {
        in: ['body'],
        exists: true,
        errorMessage: 'total_pages cannot be empty',
        isInt: {
            errorMessage: 'total_pages must be a positive integer',
            options: { min: 1 }
        },
        toInt: true
    },
    current_page: {
        in: ['body'],
        optional: true,
        isInt: {
            errorMessage: 'current_page must be a positive integer',
            options: { min: 0 }
        },
        toInt: true,
        custom: {
            errorMessage: 'current_page must be less than or equal to total_pages',
            options: (value, { req }) => {
                return (req.body.current_page <= req.body.total_pages);
            }
        }
    },
    percentage_complete: {
        in: ['body'],
        optional: true,
        // Always set percentage_complete to 0, as the DB methods will re-calculate
        customSanitizer: {
            options: (value, { req }) => {
                return 0;
            }
        }
    },
    rating: {
        in: ['body'],
        optional: true,
        isIn: {
            errorMessage: 'rating must be one of: 0.0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0',
            options: [ratings]
        },
        toFloat: true
    }
});
