import express from 'express';
import getBalance from '../controllers/accountController.js';
import eventController from '../controllers/eventController.js';

const router = express.Router();

router.post('/reset', (_, res) => {
  global.db = {
    accounts: [],
    events: [],
  };

  res.status(200).end();
});

router.get('/balance', getBalance);

router.post('/event', eventController.process);

export default router;
