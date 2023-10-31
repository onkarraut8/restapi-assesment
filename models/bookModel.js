const mongoose = require('mongoose')

const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please enter a book title"]
        },
        author: {
            type: String,
            required: [true, "Please enter a book author"]
            
        },
        summary: {
            type: String,
            required: [true, "Please enter a book summary"]
        }
    },
    {
        timestamps: true
    }
)


const Book = mongoose.model('Book', bookSchema);

module.exports = Book;