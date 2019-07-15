const { getAccountById } = require('./accountDb');

async function validateAccountId(req, res, next) {
  try {
    const { id } = req.params;
    const account = await getAccountById(id);
    if (!Number(id)) {
      return res.status(400).json({ error: 'the id provided is not a number' });
    } else if (account.length === 0) {
      return res.status(400).json({ error: 'Invalid account ID' });
    } else {
      next();
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function validateAccount(req, res, next) {
  const { name, budget } = req.body;
  if (!name || !budget) {
    return res.status(400).json({ error: 'name and budget must be added' });
  } else if (name.length === '' || name.length < 3) {
    return res.status(400).json({
      error: 'name must not be empty and should be more than 3 characters'
    });
  } else if (!Number(budget)) {
    return res.status(400).json({ error: 'budget must be a number' });
  } else {
    next();
  }
}

module.exports = { validateAccountId, validateAccount };
