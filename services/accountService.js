import account from '../models/account.js';

const assembleMessage = (success, message) => {
  return {
    success,
    message,
  };
};

const getBalance = (accountToGet) => {
  try {
    const { account_id } = accountToGet;

    if (!!!account_id) {
      return assembleMessage(
        false,
        'You should send an "account_id" parameter to get the balance'
      );
    }

    const acc = getAccountById(account_id);

    if (!!!acc) {
      return assembleMessage(false, '0');
    }

    return assembleMessage(true, `${acc.balance}`);
  } catch (error) {
    return assembleMessage(false, error);
  }
};

function makeDeposit(destination, amount) {
  let validations = false;
  let account = getAccountById(destination);

  if (!!!account) {
    account = createAccount(destination);
  }

  //fazer alguma validação
  account.balance += amount;
  validations = true;

  return assembleMessage(validations, { balance: account.balance });
}

const makeWithdraw = (origin, amount) => {
  let validations = false;
  let balance = 0;
  let account = getAccountById(origin);

  if (!!account) {
    balance = account.balance -= amount;
    account.balance = balance;
    validations = true;
  }

  return assembleMessage(validations, { balance: balance });
};

const makeTransfer = (origin, destination, amount) => {
  const originAccount = makeWithdraw(origin, amount);

  if (!originAccount.success) {
    return assembleMessage(false, originAccount.message);
  }

  const destinationAccount = makeDeposit(destination, amount);

  if (!destinationAccount.success) {
    return assembleMessage(false, destinationAccount.message);
  }

  return assembleMessage(true, {
    origin: { id: origin, balance: originAccount.message.balance },
    destination: {
      id: destination,
      balance: destinationAccount.message.balance,
    },
  });
};

const getAccountById = (id) => {
  return account.getAccountById(id);
};

const createAccount = (id) => {
  return account.createAccount(id);
};

export default {
  getBalance,
  makeDeposit,
  makeWithdraw,
  makeTransfer,
};
