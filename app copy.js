const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

const app = express();

const bookRouter = express.Router();

const port = process.env.port || 3000;

const Book = require('./models/bookModel');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
//mongodb connection 
// const url = 'mongodb://localhost:27017';

// // Database Name
// const dbName = 'bookAPI';

// // Use connect method to connect to the server
// MongoClient.connect(url, function (err, client) {

//     console.log("Connected successfully to server");

//     const db = client.db(dbName);


//     // findDocuments(db, function() {
//     //     client.close();
//     //   });
//     // insertDocuments(db, function() {
//     //     findDocuments(db, function() {
//     //         client.close();
//     //       });
//     //   });
// });

const mongooseDb = mongoose.connect('mongodb://localhost/bookAPI');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('we are connected!');
});

// var johndoe = new Book (
// {
//     title: 'Childhood',
//     genre: 'Biography',
//     author: 'Lev Nikolayevich Tolstoy',
//     read: false
// }
// );

//   // Saving it to the database.
//   johndoe.save(function (err) {if (err) console.log ('Error on save!')});



bookRouter.route('/books')
.post((req,res)=>{
    console.log(req.body);
const book = new Book(req.body);

book.save();
return res.json(book);
})

.get((req, res) => {
        const {query} = req;
        Book.find(query,(err, books) => {
            if (err) {
                return res.send(err);
            }

            return res.json(books);
        });

        // Book.find({ _id: "5ec3d08255530279400c470b", }, function(err, user) {
        //     if (err) throw err;

        //     // delete him
        //     Book.remove(function(err) {
        //       if (err) throw err;

        //       console.log('User successfully deleted!');
        //     });
        //     return res.json(user);
        //   });

        // Book.find({}).exec(function(err, result) {
        //   console.log(result);
        //   return res.json(result);
        // });

        // const url = 'mongodb://localhost:27017';

        // // Database Name
        // const dbName = 'bookAPI';

        // // Use connect method to connect to the server
        // MongoClient.connect(url, function (err, client) {

        //     console.log("Connected successfully to server");

        //     const db = client.db(dbName);
        //     console.log(db);

        //     findDocuments(db, function() {
        //         client.close();
        //       });
        //     // insertDocuments(db, function() {
        //     //     findDocuments(db, function() {
        //     //         client.close();
        //     //       });
        //     //   });
        // });

    });

    bookRouter.route('/books/:bookId')
    .get((req, res) => {
      
        Book.findById(req.params.bookId,(err, book) => {
            if (err) {
                return res.send(err);
            }

            return res.json(book);
        });
    });

app.use('/api', bookRouter);

app.get('/', (req, res) => {
    res.send('Welcome to my nodemon API');
});

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});


// const insertDocuments = function (db, callback) {
//     // Get the documents collection
//     const collection = db.collection('documents');
//     // Insert some documents
//     collection.insertMany([{
//             title: 'War and Peace',
//             genre: 'Historical Fiction',
//             author: 'Lev Nikolayevich Tolstoy',
//             read: false
//         },
//         {
//             title: 'Les Misérables',
//             genre: 'Historical Fiction',
//             author: 'Victor Hugo',
//             read: false
//         },
//         {
//             title: 'The Time Machine',
//             genre: 'Science Fiction',
//             author: 'H. G. Wells',
//             read: false
//         },
//         {
//             title: 'A Journey into the Center of the Earth',
//             genre: 'Science Fiction',
//             author: 'Jules Verne',
//             read: false
//         },
//         {
//             title: 'The Dark World',
//             genre: 'Fantasy',
//             author: 'Henry Kuttner',
//             read: false
//         },
//         {
//             title: 'The Wind in the Willows',
//             genre: 'Fantasy',
//             author: 'Kenneth Grahame',
//             read: false
//         },
//         {
//             title: 'Life On The Mississippi',
//             genre: 'History',
//             author: 'Mark Twain',
//             read: false
//         },
//         {
//             title: 'Childhood',
//             genre: 'Biography',
//             author: 'Lev Nikolayevich Tolstoy',
//             read: false
//         }
//     ], function (err, result) {

//         console.log("Inserted 3 documents into the collection");
//         callback(result);
//     });
// }

// const findDocuments = function (db, callback) {
//     // Get the documents collection
//     const collection = db.collection('documents');
//     // Find some documents
//     collection.find({}).toArray(function (err, docs) {

//         console.log("Found the following records");
//         console.log(docs)
//         callback(docs);
//     });
// }