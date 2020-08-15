const getAccountById = (id) => {
  return global.db.accounts.find((account) => account.account_id === id);
};

export default getAccountById;
