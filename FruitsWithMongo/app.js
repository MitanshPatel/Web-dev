//use 0.0.0.0 instead of localhost
//run mongod in hyper, it should show port 27017, waiting for connection
//run mongosh in another terminal, and node app.js and another terminal
//in mongosh, use cmd like 'show dbs', 'use fruitsDB',  'show collections', 'db.fruits.find()' or 'db.people.find()', 
//if wanna delete use 'db.dropDatabase()'


//-----------------USING MONGODB ONLY----------------------------
// const { MongoClient } = require("mongodb");

// // We pass our local host as our host.
// const uri = "mongodb://0.0.0.0:27017";

// // passes the mongoclient as our client to connect
// const client = new MongoClient(uri);

// // creates our database name
// const database = client.db('fruitsDB');
// // creates the database collection's name
// const fruits = database.collection('fruits');

// async function run() {
//   try {
//     // connects to the server
//     await client.connect();
//     // shows that we have connected on our console
//     console.log("Connected Successfully to server");

//     // creates the db's content, once its created, remove this as the data is saved, and _id cannot be updated
//     const contentOf = [{
//       _id: 6,
//       fruit: "Apple",
//       rating: 4,
//       review: "I like it when it's sweet!"
//     },
//     {
//       _id: 7,
//       fruit: "Banana",
//       rating: 5,
//       review: "My favorite!"
//     },
//     {
//       _id: 8,
//       fruit: "Orange",
//       rating: 2,
//       review: "Not appealing for me... Seems like I need to run to the toilet afterwards..."
//     }]

//     // orders the items
//     const options = { ordered: true }

//     // to insert the above contentOf array, once required to insert
//     const result = await fruits.insertMany(contentOf, options);
//     console.log(`${result.insertedCount} documents were inserted`);

//     // show all the fruits existing
//     const allFruits = fruits.find();

//     // displays the documents if there's any
//     await allFruits.forEach((document) => {
//       console.log(document);
//     });


//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }

// run().catch(console.dir);


//-----------USING MOGOOSE AND MONGODB---------
// Install mongoose
const mongoose = require('mongoose');
 
//Connection to MongoDB database
//⁡⁢⁣⁣This line will specify the port where we will access our MongoDB Server
//⁡⁢⁣⁣Here "fruitsDB" is the name of the database where we want to connect to.⁡
mongoose.connect("mongodb://0.0.0.0:27017/fruitsDB", {useNewUrlParser: true});
 
//Here we create new blueprint of our database(Schema)
//This lays foundation for every new fruit document that will be added to our DB.
const fruitSchema = new mongoose.Schema({
    name: String,
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});
 
const Fruit = mongoose.model("Fruit", fruitSchema);
 
const fruit = new Fruit({
    name: "Apple",
    rating: 7,
    review: "Apple keeps the doctor away"
})
 
//This save() method in Mongoose is used to save this fruit document into fruit collection inside our fruitsDB
//fruit.save();//Once a collection is saved comment fruit.save() bcoz everytime it will save same thing multiple times.
 
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please check your fruit. No name has been specified!"],
    },
    age: Number
});
 
const Person = mongoose.model("Person", personSchema);
 
const person = new Person({
    name: "Jhon",
    age: 37
});
 
//person.save();
 
 
//How to insert these many fruits at a time? (by using insertMany() method)
const kiwi = new Fruit({
    name: "Kiwi",
    rating: 10,
    review: "The Best Fruit!"
});
 
const orange = new Fruit({
    name: "Orange",
    rating: 6,
    review: "The Sour Fruit!"
});
 
const banana = new Fruit({
    name: "Banana",
    rating: 8,
    review: "The Digestive Fruit!"
});
 
console.log("Connected Successfully to server");

//Now insertMany has stopped accepting callbacks
//instead they use promises(Which Angela has not taught)
//So .then & catch are part of PROMISES IN JAVASCRIPT
// Fruit.insertMany([kiwi, orange, banana]) 
//     .then(function(){
//         console.log("Successfully saved all the fruits to fruitsDB");
//     })
//     .catch(function(err){
//         console.log(err);
//     });

//TO PRINT
Fruit.find()
    .then(function (fruits) {       //inside the fruits collection
        fruits.forEach(function (fruit) {         //for printing all fruits
            console.log(fruit);
        });
    })
    .catch(function (err) {
        console.log(err);
    });

//TO UPDATE
Fruit.updateOne({_id:4}, {name: "Dragon Fruit"})
  .then(result => {
    mongoose.connection.close()
    console.log(result);
  })
  .catch(err => {
    console.log(err);
  })

//TO DELETE 
  Fruit.deleteOne({ name: "Peach" })
  .then(function(result) {
    console.log("Successfully deleted the fruit.");
  })
  .catch(function(err) {
    console.log(err);
  });
 

  Person.deleteMany({ name: "John"})
  .then(function(result) {
    console.log("Successfully deleted the all people.");
  })
  .catch(function(err) {
    console.log(err);
  });


  //connect 2 tables
const pineapple = new Fruit({
name: "pineapple",
rating: 7,
review: "tasty but makes my mouth sting when uncooked"
});

pineapple.save();

Person.updateOne({ name: "John"}, {favoriteFruit: pineapple}, function(err) {})