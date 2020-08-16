function getAccountById(id) {
  return global.db.accounts.find((account) => account.id === id);
}

function createAccount(id) {
  const account = {
    id,
    balance: 0,
  };

  global.db.accounts.push(account);

  return account;
}

function makeDeposit(destination_id, amount) {
  let validations = false;
  let account = getAccountById(destination_id);

  if (!!!account) {
    account = createAccount(destination_id);
  }

  //fazer alguma validação
  account.balance += amount;
  validations = true;

  return {
    validations,
    balance: account.balance,
  };
}

function makeWithdraw(origin_id, amount) {
  let validations = false;
  let balance = 0;
  let account = getAccountById(origin_id);

  if (!!account) {
    balance = account.balance -= amount;
    account.balance = balance;
    validations = true;
  }

  return {
    validations,
    balance,
  };
}

export default {
  getAccountById,
  createAccount,
  makeDeposit,
  makeWithdraw,
};
