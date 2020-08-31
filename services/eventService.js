import accountService from '../services/accountService.js';
import event from '../models/event.js';

const assembleMessage = (success, message) => {
  return {
    success,
    message,
  };
};

function process(eventToProcess) {
  const { type, origin, destination, amount } = eventToProcess;

  switch (type) {
    case 'deposit':
      return makeDeposit(destination, amount);
    case 'withdraw':
      return makeWithdraw(origin, amount);
    case 'transfer':
      return makeTransfer(origin, destination, amount);
    default:
      return assembleMessage(false, 'You should send a valid event type');
  }
}

const makeDeposit = (destination, amount) => {
  const returnMD = accountService.makeDeposit(destination, amount);
  event.add({ type: 'deposit', destination, amount });

  return assembleMessage(true, {
    destination: { id: destination, balance: returnMD.message.balance },
  });
};

const makeWithdraw = (origin, amount) => {
  const returnMW = accountService.makeWithdraw(origin, amount);

  if (!returnMW.success) {
    return assembleMessage(false, '0');
  }

  event.add({ type: 'withdraw', origin, amount });

  return assembleMessage(true, {
    origin: { id: origin, balance: returnMW.message.balance },
  });
};

const makeTransfer = (origin, destination, amount) => {
  const returnMT = accountService.makeTransfer(origin, destination, amount);

  if (!returnMT.success) {
    return assembleMessage(false, '0');
  }

  event.add({ type: 'transfer', origin, amount, destination });

  return assembleMessage(true, returnMT.message);
};

export default { process };
