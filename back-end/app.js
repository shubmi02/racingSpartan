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
const {generateSalt, hash} = require("./ai-dependencies/password");

var app = express();
const port = process.env.PORT || 5000;
const client = new MongoClient(process.env.DB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.use(express.json());

let userDB = null;
let classDB = null;
async function connectToDatabase() {
  try {
    await client.connect();
    userDB = client.db('RacingSpartan').collection('Users'); 
    classDB = client.db('RacingSpartan').collection('Classes');
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

app.post('/api/signup', async (req, res) => {
  console.log(req.body);

  //input validation
  if (req.body.password.length >= 2) {
    //safe to write to db
    let doc = req.body;
    doc['classes'] = [];
    doc['salt'] = generateSalt();
    doc['password'] = hash(req.body.password, doc['salt']);
    
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
  const { email } = req.body;
  console.log(email);
  const userPassword = await userDB.aggregate([
    {
      $match: {
        email: email
      }
    },
    {
      $project: {
        _id: 0, // Exclude the _id field if you want
        password: 1,
        salt: 1
      }
    }

  ]).toArray();

  if (userPassword) {
    const hashedStoredPassword = userPassword[0].password;
    const salt = userPassword[0].salt;
    const hashedEnteredPassword = hash(req.body.password, salt);
    console.log(`hashed stored: ${hashedStoredPassword} \nhashed entered ${hashedEnteredPassword}`);
    if (hashedEnteredPassword === hashedStoredPassword) {
      res.json(1);
      return;
    }
  }
  

  res.json(0);
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

//for the AI API
app.post("/queryData", (req, res) => {
  const {
    serving_endpoint,
    customer_id,
    corpus_id,
    auth_url,
    client_id,
    client_secret,
  } = req.body;
  getJwtToken(auth_url, client_id, client_secret)
    .then((token) => {
      query
        .query(customer_id, corpus_id, serving_endpoint, token)
        .then((result) => {
          res.send(result.data);
        });
    })
    .catch((err) => {
      error = {
        detail: "Could not obtain OAuth token.",
        message: err.message,
        code: err.code,
      };
      res.send(JSON.stringify(error));
    });
});

app.post("/createCorpus", (req, res) => {
  const { admin_endpoint, customer_id, auth_url, client_id, client_secret } =
    req.body;
  getJwtToken(auth_url, client_id, client_secret)
    .then((token) => {
      create_corpus
        .createCorpus(customer_id, admin_endpoint, token)
        .then((result) => {
          res.send(result.data);
        });
    })
    .catch((err) => {
      error = {
        detail: "Could not obtain OAuth token.",
        message: err.message,
        code: err.code,
      };
      res.send(JSON.stringify(error));
    });
});

app.post("/deleteCorpus", (req, res) => {
  const {
    admin_endpoint,
    customer_id,
    auth_url,
    client_id,
    client_secret,
    corpus_id,
  } = req.body;
  getJwtToken(auth_url, client_id, client_secret)
    .then((token) => {
      delete_corpus
        .deleteCorpus(customer_id, corpus_id, admin_endpoint, token)
        .then((result) => {
          res.send(result.data);
        });
    })
    .catch((err) => {
      error = {
        detail: "Could not obtain OAuth token.",
        message: err.message,
        code: err.code,
      };
      res.send(JSON.stringify(error));
    });
});

app.post("/uploadFile", (req, res) => {
  const {
    indexing_endpoint,
    customer_id,
    corpus_id,
    auth_url,
    client_id,
    client_secret,
  } = req.body;
  getJwtToken(auth_url, client_id, client_secret)
    .then((token) => {
      upload_file
        .uploadFile(customer_id, corpus_id, indexing_endpoint, token)
        .then((result) => {
          res.send(result.data);
        });
    })
    .catch((err) => {
      error = {
        detail: "Could not obtain OAuth token.",
        message: err.message,
        code: err.code,
      };
      res.send(JSON.stringify(error));
    });
});

function getJwtToken(auth_url, client_id, client_secret) {
  const URL_SUFFIX = '/oauth2/token';
  const sanitized_url = auth_url.replace(/\/+$/, ''); // remove trailing slashes
  const url = sanitized_url.endsWith(URL_SUFFIX) ? sanitized_url : `${sanitized_url}${URL_SUFFIX}`;
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  return new Promise((resolve, reject) => {
    axios
      .post(
        url,
        new URLSearchParams({
          grant_type: "client_credentials",
          client_id,
          client_secret
        }),
        config
      )
      .then((result) => {
        resolve(result.data.access_token);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}

app.listen(port, '0.0.0.0', () => console.log(`server started on port ${port}`));





