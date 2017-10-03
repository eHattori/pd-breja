import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import auth from './middlewares/auth';
import logger from './utils/logger';

import HealthRoutes from './api/health/health-routes';
import PdvRoutes from './api/pdv/pdv-routes';

const app = express();

const healthApp = new HealthRoutes(express);
const pdvApp = new PdvRoutes(express);

app.use(compression())
   .use(cors({credentials: true}))
   .use(bodyParser.json())
   .use(bodyParser.urlencoded({ extended: true }))
   .use(auth);

app.use('/health', healthApp.getApp());
app.use('/pdv', pdvApp.getApp());

app.listen((process.env.PORT || 3000), function () {
  logger.info('Listening on ' + (process.env.PORT || 3000));
});
