const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

var app = express();
const port = process.env.PORT || 5000;
const client = new MongoClient(process.env.DB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connectToDatabase();

const userDB = client.db('RacingSpartan').collection('Users'); 

app.use(cors({
  origin: true,
  maxAge: 86400
}));

app.use(bodyParser.json({ limit: '10mb' }));




app.post('/api/test', async (req, res) => {
  const doc = {
    name: 'kanoa',
    age: '25'
  }

  const result = await userDB.insertOne(doc);
  console.log(`inserted id: ${result.insertedId}`);
  res.json('hi');
});

app.listen(port, () => console.log(`server started on port ${port}`));




