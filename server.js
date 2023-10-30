const express = require('express')
const mongoose = require('mongoose')
const Book = require('./models/bookModel')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
const url= 'mongodb://0.0.0.0:27017/bookdatabase'

mongoose.set("strictQuery", false)
//Database Connection
mongoose.
connect(url)
.then(() => {
    console.log('Connected to MongoDB')
    app.listen(3000, ()=> {
        console.log('app is running on port 3000')
    });
}).catch((error) => {
    console.log(error)
})
//routes

app.get('/', (req, res) => {
    res.send('Hello World')
})

//Save create book to database
app.post('/savebooks', async(req, res) => {
    try {
        const book = await Book.create(req.body)
        res.status(200).json(book);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

//get all books
app.get('/books', async(req, res) => {
    try {
        const books = await Book.find({});
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//get book by ID
app.get('/book/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const book = await Book.findById(id);
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})



// update a book
app.put('/book/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const book = await Book.findByIdAndUpdate(id, req.body);
        // we cannot find any book in database
        if(!book){
            return res.status(404).json({message: `cannot find any book with ID ${id}`})
        }
        const updatedBook = await Book.findById(id);
        res.status(200).json(updatedBook);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// delete a book
app.delete('/book/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const book = await Book.findByIdAndDelete(id);
        if(!book){
            return res.status(404).json({message: `cannot find any book with ID ${id}`})
        }
        res.status(200).json(book);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

