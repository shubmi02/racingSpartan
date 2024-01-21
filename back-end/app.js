//MongoDB constants
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

//API constants
const axios = require("axios");
const create_corpus = require("./ai-dependencies/create_corpus");
const delete_corpus = require("./ai-dependencies/delete_corpus");
const upload_file = require("./ai-dependencies/upload_file");
const query = require("./ai-dependencies/query");

var app = express();
const port = process.env.PORT || 5000;
const client = new MongoClient(process.env.DB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let userDB = null;
async function connectToDatabase() {
  try {
    await client.connect();
    userDB = client.db('RacingSpartan').collection('Users'); 
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}


connectToDatabase();

app.use(cors({
  origin: true,
  maxAge: 86400
}));

app.use(bodyParser.json({ limit: '50mb' }));

app.post('/api/signUp', async (req, res) => {
  console.log(req.body);

  //input validation
  if (req.body.password.length >= 8) {
    //safe to write to db
    let doc = req.body;
    doc['classes'] = [];
    
    const result = await userDB.insertOne(doc);
    console.log(result.insertedId);
  }
  else {
    res.json({
      msg: 'password too short'
    });
    return;
  }
  

  res.json(1);
});

app.post('/api/login', async (req, res) => {
  console.log(req.body);

  res.json(1);
});



app.post('/api/test', async (req, res) => {
  const doc = {
    name: 'kanoa',
    age: '25'
  }

  const result = await userDB.insertOne(doc);
  console.log(`inserted id: ${result.insertedId}`);
  res.json('bruh');
});

app.listen(port, () => console.log(`server started on port ${port}`));


