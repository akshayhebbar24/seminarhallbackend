const express = require('express');
const { registerUser, loginUser } = require('../controller/user');
const router = express.Router();

router.post('/register', async (req, res) => {
  await registerUser(req, res);
});

router.post('/login', async (req, res) => {
  await loginUser(req, res);
});

module.exports = router;