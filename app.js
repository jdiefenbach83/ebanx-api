import express from 'express';
import apiRouter from './routes/api.js';

global.db = {
  accounts: [],
  events: [],
};

const app = express();
app.use(express.json());

app.use('/', apiRouter);

export default app;
