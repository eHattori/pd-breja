import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import auth from './middlewares/auth';
import logger from './utils/logger';
import HealthRoute from './api/health/health-routes';

const app = express();
const healthApp = new HealthRoute(express);

app.use(compression());
app.use(cors({credentials: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(auth);

app.use('/health', healthApp.getRoutes());

app.listen((process.env.PORT || 3000), function () {
  logger.info('Listening on ' + (process.env.PORT || 3000));
});
