const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fruitsDB', {useNewUrlParser: true, useUnifiedTopology: true}); // name of database to connect to / create

// Create a new schema
fruitSchema = new mongoose.Schema({ // identify the data fields
    name: {
        type: String,
        required: [true, "Please give a name to this fruit."]
    },
    rating: {
        type: Number,
        max: [10, "too high"],
        min: [1, "too low"],
        required: true
    }
});

const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favouriteFruit: fruitSchema
});

// Compile our schema into a model
const Fruit = mongoose.model('fruits', fruitSchema); 
const Person = mongoose.model('Person', personSchema);

// Insert documents async function
const insertDocuments = function (db, callback) {
    // Get the documents collection
    const collection = db.collection('fruits');
    // Insert some documents
    collection.insertMany([{
        name: "Orange",
        score: 6,
        review: "Kinda sour"
    }, {
        name: "Apple",
        score: 8,
        review: "Great fruit."
    }, {
        name: "Banana",
        score: 9,
        review: "Great stuff!"
    }], function (err, result) {
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log("Inserted 3 documents into the collection");
        callback(result);
    });
};

const pineapple = new Fruit(
    {
        name: "Pineapple",
        rating: 9,
        review: "Amazing! Simply the best."
    }
);

pineapple.save();

const person = new Person({
    name: "John",
    age: 81,
    favouriteFruit: pineapple
});

person.save();



// const orange = new Fruit({
//     name: "Orange",
//     score: 8,
//     review: "Great fruit."
// });

// const banana = new Fruit({
//     name: "Banana",
//     score: 4,
//     review: "Weird texture!"
// });

// Fruit.insertMany([banana, orange], (err) => {
//     if (err) {
//         console.log(err);
//     }
//     else { console.log("Successfully added 3 fruits");}
// });


Fruit.find((err, fruits) => { // Fruit is the collection
    if (err) {
        console.log(err);
    }
    else {
        console.log(fruits);
        fruits.forEach((fruit) => {
            console.log(fruit.name);
        });
    }
});

Fruit.deleteMany({name: "Kiwi"}, (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Successfully deleted!");
        mongoose.connection.close();
    }
});
