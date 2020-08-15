import account from '../models/account.js';

const getBalance = (req, res) => {
  const query = req.query;

  if (Object.keys(query).length === 0 || !!!query.account_id) {
    res.status(400).send({
      message: 'You should send an "account_id" parameter to get the balance',
    });
  } else {
    const acc = account.getAccountById(query.account_id);

    if (!!!acc) {
      res.status(404).end();
    }
  }
};

export default getBalance;
