const { checkSchema } = require('express-validator');

const bookTypes = ['fiction', 'nonfiction', 'graphicnovel', 'selfhelp', 'professional'];

exports.validateBookId = checkSchema( {
   bookId: {
       in: ['params'],
       errorMessage: 'bookId must be an integer',
       isInt: true
   }
})

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
    }
});
