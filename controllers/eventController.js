import account from '../models/account.js';
import event from '../models/event.js';

function process(req, res) {
  const body = req.body;

  if (Object.keys(body).length === 0 || !!!body.type) {
    res.status(400).send({
      message: 'You should send the correct event parameters',
    });
  } else {
    switch (body.type) {
      case 'deposit':
        makeDeposit(body, res);
        break;
      default:
        res.status(400).send({
          message: 'You should send a valid event type',
        });
    }
  }
}

const makeDeposit = (event_received, res) => {
  const { destination, amount } = event_received;

  let acc = account.getAccountById(destination);

  if (!!!acc) {
    acc = account.createAccount(destination);
  }

  acc.balance += amount;
  event.add(event_received);

  const retorno = {
    destination: { id: destination, balance: acc.balance },
  };

  res.status(201).send(retorno);
};

export default { process };
