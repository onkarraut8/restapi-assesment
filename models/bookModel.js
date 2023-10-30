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
        summay: {
            type: String,
            required: [true, "Please enter a book summary"]
        }
    },
    {
        timestamps: true
    }
)


const Product = mongoose.model('Product', productSchema);

module.exports = Product;