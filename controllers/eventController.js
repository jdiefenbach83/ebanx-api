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
      case 'withdraw':
        makeWithdraw(body, res);
        break;
      case 'transfer':
        makeTransfer(body, res);
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

const makeWithdraw = (event_received, res) => {
  const { origin, amount } = event_received;

  let acc = account.getAccountById(origin);

  if (!!!acc) {
    res.status(404).send('0');
  } else {
    acc.balance -= amount;
    event.add(event_received);

    const retorno = {
      origin: { id: origin, balance: acc.balance },
    };

    res.status(201).send(retorno);
  }
};

const makeTransfer = (event_received, res) => {
  const { origin, destination, amount } = event_received;

  let origin_acc = account.getAccountById(origin);
  let destination_acc = account.getAccountById(destination);

  if (!!!origin_acc) {
    res.status(404).send('0');
  } else {
    if (!!!destination_acc) {
      destination_acc = account.createAccount(destination);
    }

    origin_acc.balance -= amount;
    destination_acc.balance += amount;
    event.add(event_received);

    const retorno = {
      origin: { id: origin, balance: origin_acc.balance },
      destination: { id: destination, balance: destination_acc.balance },
    };

    res.status(201).send(retorno);
  }
};

export default { process };
