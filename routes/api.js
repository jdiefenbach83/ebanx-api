import express from 'express';

const router = express.Router();

router.post('/reset', (_, res) => {
  global.db = {
    accounts: [],
    events: [],
  };

  res.status(200).end();
});

export default router;
