const mongoose = require('mongoose')

// Establish Connection to Database:
if (process.argv.length < 3) {
    console.log('Give password as argument')
    process.exit(1)
}

const password = process.argv[2]
const url = "mongodb+srv://kevin2410:pe5yuk4m2g96j9@cluster0.8xpn6pg.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0"

mongoose.set('strictQuery', false)
mongoose.connect(url)



// Define book and author schema.
const bookSchema = new mongoose.Schema({
    author: String,
    title: String,
    genre: String,
    pageCount: Number,
    rating: Number,
})

const authorSchema = new mongoose.Schema({
    name: String,
    nationality: String,
    releaseCount: Number,
    age: Number,
})

// Create book and author model.
const Book = mongoose.model('Book', bookSchema)
const Author = mongoose.model('Author', authorSchema)

// Create the book and author objects.
const itBook = new Book({
    author: 'Stephen King',
    title: 'It',
    genre: 'Horror',
    pageCount: 1168,
    rating: 4.6,
})

const theShiningBook = new Book({
    author: 'Stephen King',
    title: 'The Shining',
    genre: 'Horror',
    pageCount: 618,
    rating: 4.4,
})

const author = new Author({
    name: 'Stephen King',
    nationality: 'American',
    releaseCount: 65,
    age: 77,
})

// itBook.save().then(result => {
//     console.log(result)
//     console.log(`Saved the book: ${result.title}!`)
// })
// console.log('It has been saved!')

// theShiningBook.save().then(result => {
//     console.log(`Test case 1: Saved the book: ${result.title}!`)
// })
// console.log('Shining has been saved!')

// author.save().then(result => {
//     console.log(`Test case 2: Saved the author: ${result.name}!`)
//     mongoose.connection.close()
// }) 
// console.log('Test case 3: Author has been saved!')

// Search for all horror books.
Book.find({title: 'The Shining'}).then(result => {
    result.forEach(book => {
        console.log(book.author)
    })
    mongoose.connection.close()
})

// Author.find({}).then(result => {
//     result.forEach(book => {
//         console.log(book)
//     })
// })

