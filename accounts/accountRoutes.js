const express = require('express');
const {
  getAccounts,
  getAccountById,
  AddNewAccount,
  updateAccount,
  deleteAccount
} = require('./accountDb');

const { validateAccountId, validateAccount } = require('./validateAccount');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const accounts = await getAccounts();
    if (accounts.length === 0) {
      return res.status(400).json({ message: 'no account has been created' });
    }
    return res.status(200).json(accounts);
  } catch (error) {
    return res.status(500).json({ error: 'could not retrieve accounts data ' });
  }
});

router.get('/:id', validateAccountId, async (req, res) => {
  try {
    const account = await getAccountById(req.params.id);
    return res.status(200).json(account);
  } catch (error) {
    return res.status(500).json({ error: 'could not retrieve account' });
  }
});

router.post('/', validateAccount, async (req, res) => {
  try {
    const account = await AddNewAccount(req.body);
    return res.status(201).json(account);
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ error: 'could not save account to the database' });
  }
});

router.put('/:id', validateAccountId, validateAccount, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAccount = await updateAccount(id, req.body);
    const account = await getAccountById(id);
    return res.status(200).json(account);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'could not save account to the database' });
  }
});

router.delete('/:id', validateAccountId, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAccount = await deleteAccount(id);
    return res
      .status(200)
      .json({ message: 'account has been deleted successfully' });
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'account could not be deleted from the database' });
  }
});

module.exports = router;
