import express from 'express';
import apiRouter from './routes/api.js';

global.db = {
  accounts: [],
  events: [],
};

const app = express();

app.use('/api', apiRouter);
app.use(express.json());

export default app;
