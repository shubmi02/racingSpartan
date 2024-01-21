//MongoDB constants
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const fs = require('fs');

//API constants
const axios = require("axios");
const create_corpus = require("./ai-dependencies/create_corpus");
const delete_corpus = require("./ai-dependencies/delete_corpus");
const upload_file = require("./ai-dependencies/upload_file");
const query = require("./ai-dependencies/query");
const { generateSalt, hash } = require("./ai-dependencies/password");

var app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: true,
  maxAge: 86400
}));

app.use(express.json({ limit: '100mb' })); // Adjust the limit as needed


app.use(bodyParser.json({ limit: '100mb' }));

const client = new MongoClient(process.env.DB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

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
    if (result.insertedId) {
      res.json(result.insertedId);
    }
    else {
      res.json({ msg: 'error with db' })
    }
  }
  else {
    res.json({
      msg: 'password too short'
    });
    return;
  }

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
        _id: 1, // Exclude the _id field if you want
        password: 1,
        salt: 1
      }
    }

  ]).toArray();
  let result
  if (userPassword && userPassword.lenth > 0) {
    const hashedStoredPassword = userPassword[0].password;
    const salt = userPassword[0].salt;
    const hashedEnteredPassword = hash(req.body.password, salt);
    console.log(`hashed stored: ${hashedStoredPassword} \nhashed entered ${hashedEnteredPassword}`);
    if (hashedEnteredPassword === hashedStoredPassword) {
      res.json(userPassword[0]._id);
      return;
    }
  }


  res.json({});
});

app.post('/api/addClass', async (req, res) => {
  console.log(`req.body = \n${req.body}`);
  const { teacherID, teacherName, className } = req.body;
  console.log(`teacherID, = ${teacherID}\nteacherName, = ${teacherName}\nclassName, = ${className}\n`);
  const doc = {
    teacherID: teacherID,
    teacherName: teacherName,
    className: className,
    articles: [],
    students: []
  }
  const classResult = await classDB.insertOne(doc);
  let insertedId = null;
  if (classResult.insertedId) {
    insertedId = classResult.insertedId;
  }
  else {
    res.json(0);
  }

  const userResult = await userDB.updateOne(
    {
      _id: new ObjectId(teacherID)
    },
    {
      $push: { classes: insertedId }
    }
  );

  if (userResult.modifiedCount === 1) {
    res.json(insertedId);
    return;
  }


  res.json({});
});

app.post('/api/addArticle', async (req, res) => {
  const { classID, articleName, file } = req.body;
  console.log(classID);
  console.log(articleName);

  const result = await classDB.updateOne(
    {
      _id: new ObjectId(classID)
    },
    {
      $push: {
        articles: {
          articleName: articleName,
          file: file
        }

      }
    }
  );

  if (result.modifiedCount && result.modifiedCount === 1) {
    res.json(1);
  }
  else {
    res.json(0);
  }
});

app.post('/api/getArticles', async (req, res) => {
  const { ClassID } = req.body;
  console.log(ClassID);
  const result = await classDB.aggregate([
    {
        $match : {
          _id: new ObjectId(ClassID)
        }
    },
    {
      $project: {
        articles: 1
      }
    }]).toArray();
  if (result.length > 0) {
    res.json(result[0]);
  }
  else {
    res.json(0);
  }
})

app.post('/api/getSummary', async (req, res) => {
  const { text } = req.body;
  const body = {
    serving_endpoint: 'api.vectara.io',
    customer_id: process.env.VECTARA_CUSTID,
    corpus_id: 13,
    auth_url: 'https://vectara-prod-3045926619.auth.us-west-2.amazoncognito.com/oauth2/token',
    client_id: process.env.VECTARA_CLIENTID,
    client_secret: process.env.VECTARA_CLIENT_SECRET,
    text: text
  }
  //console.log(body);
  let response = await axios.post(`http://localhost:5000/api/queryData`, body);
  // console.log(response.data.responseSet[0].summary[0].text);
  let summary = response.data.responseSet[0].summary[0].text;

  res.json(summary);

});

app.post('/api/deleteClass', async (req, res) => {
  const { classID } = req.body;
  const result = await classDB.deleteMany({
    _id: new ObjectId(classID)
  });
  if (result.deletedCount > 0) {
    console.log("Documents deleted successfully");
  } else {
    console.log("No documents found");
  }
});



app.post('/api/test', async (req, res) => {
  // const doc = {
  //   name: 'kanoa',
  //   age: '25'
  // }

  // const result = await userDB.insertOne(doc);
  console.log(`test`);
  res.json('bruh');
});

//for the AI API
app.post("/api/queryData", (req, res) => {
  const {
    serving_endpoint,
    customer_id,
    corpus_id,
    auth_url,
    client_id,
    client_secret,
    text
  } = req.body;
  getJwtToken(auth_url, client_id, client_secret)
    .then((token) => {
      query
        .query(customer_id, corpus_id, serving_endpoint, token, text)
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





