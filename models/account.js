function getAccountById(id) {
  return global.db.accounts.find((account) => account.account_id === id);
}

function createAccount(id) {
  const account = {
    id,
    balance: 0,
  };

  global.db.accounts.push(account);

  return account;
}

export default { getAccountById, createAccount };
