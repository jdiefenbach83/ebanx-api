import express from 'express';
import getBalance from '../controllers/accountController.js';

const router = express.Router();

router.post('/reset', (_, res) => {
  global.db = {
    accounts: [],
    events: [],
  };

  res.status(200).end();
});

router.get('/balance', getBalance);

export default router;
