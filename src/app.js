const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const auth = require('./middlewares/auth');
const logger = require('./utils/logger');
const app = express();

const healthApp = require('./api/health/health-routes');

app.use(compression());
app.use(cors({credentials: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(auth);

app.get('/api', function (req, res) {
  res.send('Hello World!');
});

app.use('/health', healthApp.getRoutes());

app.listen((process.env.PORT || 3000), function () {
  logger.info('Listening on ' + (process.env.PORT || 3000));
});
