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

  const retornMD = account.makeDeposit(destination, amount);
  event.add(event_received);

  res.status(201).send({
    destination: { id: destination, balance: retornMD.balance },
  });
};

const makeWithdraw = (event_received, res) => {
  const { origin, amount } = event_received;

  const returnMW = account.makeWithdraw(origin, amount);

  if (!returnMW.validations) {
    res.status(404).send('0');
  } else {
    event.add(event_received);

    res.status(201).send({
      origin: { id: origin, balance: returnMW.balance },
    });
  }
};

const makeTransfer = (event_received, res) => {
  const { origin, destination, amount } = event_received;

  const returnMW = account.makeWithdraw(origin, amount);

  if (!returnMW.validations) {
    res.status(404).send('0');
  } else {
    const returnMD = account.makeDeposit(destination, amount);
    if (returnMD.validations) {
      event.add(event_received);

      const retorno = {
        origin: { id: origin, balance: returnMW.balance },
        destination: { id: destination, balance: returnMD.balance },
      };

      res.status(201).send(retorno);
    } else {
      res.status(500);
    }
  }
};

export default { process };
