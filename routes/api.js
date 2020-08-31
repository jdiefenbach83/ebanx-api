import express from 'express';
import db from '../database/db.js';
import getBalance from '../controllers/accountController.js';
import eventController from '../controllers/eventController.js';

const router = express.Router();

router.post('/reset', (_, res) => {
  db.reset();

  res.status(200).end('OK');
});

router.get('/balance', getBalance);

router.post('/event', eventController.process);

export default router;
