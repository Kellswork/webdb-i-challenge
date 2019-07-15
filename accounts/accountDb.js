const db = require('../data/dbConfig');

function getAccounts(query) {
  const getAccounts = db('accounts');
  if (query.limit) {
    getAccounts.limit(query.limit);
  }
  if (query.sortby) {
    getAccounts.orderBy(query.sortby, query.sortdir);
  }
  return getAccounts;
}

function getAccountById(id) {
  return db('accounts').where({ id });
}

function AddNewAccount(account) {
  return db('accounts')
    .insert(account)
    .then(ids => {
      return getAccountById(ids[0]);
    });
}

function updateAccount(id, updatedAccount) {
  return db('accounts')
    .where({ id })
    .update(updatedAccount);
}

function deleteAccount(id) {
  return db('accounts')
    .where({ id })
    .delete();
}

module.exports = {
  getAccounts,
  getAccountById,
  AddNewAccount,
  updateAccount,
  deleteAccount
};
