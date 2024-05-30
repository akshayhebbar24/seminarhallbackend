const { getRecords, insertRecords } = require("../dbInterface");


const registerUser = async (req, res) => {
  try{
    const userDetails = req.body;
    await validateUser(userDetails.email);
    await insertRecords('users', userDetails);
    res.status(200).send({status: 'success', message: 'User registered'});
  } catch (err) {
    res.status(400).send({status: 'failed', message: err.message});
  }
};

const validateUser = async (email) => {
  const user = await getRecords('users', {email});
  if (user.length > 0) {
    throw new Error('Email already registed');
  }
};

const loginUser = async (req, res) => {
  try {
  const query = {email: req.body.email, password: req.body.password};
  const result = await getRecords('users', query);
  if (result.length > 0) {
    return res.status(200).send({status: 'suceess', message: 'Login successful', data: result[0]});
  }
  throw new Error('Authorization failed');
} catch (err) {
  return res.status(401).send({status: 'failed', message: err.message});
}
};


module.exports = {
  registerUser, loginUser
}