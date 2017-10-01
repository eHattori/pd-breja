const express = require('express')
const bodyParser = require('body-parser');
const compression = require("compression");
const cors = require('cors');
const auth = require('./middlewares/auth');

const app = express()

app.use(compression());
app.use(cors({credentials: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(auth);

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen((process.env.PORT || 3000), function () {
  console.log("Listening on " + (process.env.PORT || 3000));
})
