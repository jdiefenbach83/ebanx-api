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

function makeDeposit(destination_id, amount) {
  let validations = false;
  let account = getAccountById(destination_id);

  if (!!!account) {
    account = createAccount(destination_id);
  }

  //fazer alguma validação
  account.balance += amount;
  validations = true;

  return assembleMessage(validations, { balance: account.balance });
}

const makeWithdraw = (origin_id, amount) => {
  let validations = false;
  let balance = 0;
  let account = getAccountById(origin_id);

  if (!!account) {
    balance = account.balance -= amount;
    account.balance = balance;
    validations = true;
  }

  return assembleMessage(validations, { balance: balance });
};

const getAccountById = (id) => {
  return account.getAccountById(id);
};

const createAccount = (id) => {
  return account.createAccount(id);
};

export default { getBalance, makeDeposit, makeWithdraw, getAccountById };
