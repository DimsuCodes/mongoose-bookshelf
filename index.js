
//configure our env iroment variable
import 'dotenv/config';

//bring in mongoose
import mongoose from 'mongoose'

//bring in our model
import Book from './models/Book.js'
import express from 'express'
import dns from 'node:dns';


//setting dns so node doesn't yell at me

dns.setServers(['1.1.1.1', '8.8.8.8']);

//establish a connection to our db
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connect to MongoDB!'))
    .catch((e) => console.log(e));



const app = express();

//apply middleware
app.use(express.json());


const port = 3000;


// handle a POST request to creat e a new codument

app.post("/api/books", async (req, res) => {
    //creaye a mew document for the books collection (temporary)
    const newBook = new Book({
        title: req.body.title,
        author: req.body.author,
        publicationYear: req.body.publicationYear
    });

    //save the document to our database(permentaly)

    await newBook.save();

    //always respond
    res.status(201).json(newBook)
})
app.get("/", (req, res) => {
    res.send("Hello World!");

})

app.listen(port, () => console.log ('Server running on port: ' + port))