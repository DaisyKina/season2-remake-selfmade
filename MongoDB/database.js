const { MongoClient } = require('mongodb');
const { default: mongoose } = require('mongoose');


const url = 'mongodb://localhost:3001';
const client = new MongoClient(url);


async function connectToDB() {
  try{
    await mongoose.connect('mongodb+srv://quangvu20022006:EFpWMj0nQkWd99Ve@cluster0.ayqjyvy.mongodb.net/?retryWrites=true&w=majority');
    console.log('Connected được rồi con đĩ');
  }catch (error) { 
    console.log(error)
  }
}

module.exports = {
  connectToDB
}
