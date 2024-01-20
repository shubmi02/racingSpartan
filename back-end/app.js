const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


var app = express();
const port = 5000;

app.use(cors({
  origin: true,
  maxAge: 86400
}));

app.use(bodyParser.json({ limit: '10mb' }));


app.post('/test', async (req, res) => {
  res.json('hows it goin');
});

app.listen(port, () => console.log(`server started on port ${port}`));




