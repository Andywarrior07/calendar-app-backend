const bcrypt = require('bcryptjs');
const User = require('../schemas/User');
const { generateJWT } = require('../helpers/jwt');

const createUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const isUserExists = await User.findOne({ email });

    if (isUserExists) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const user = new User(req.body);
    const salt = bcrypt.genSaltSync();

    user.password = bcrypt.hashSync(password, salt);
    user.salt = salt;

    await user.save();

    const token = await generateJWT(user._id, user.name);

    return res.status(201).json({
      uid: user._id,
      name: user.name,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Please talk with administrator' });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Email or password incorrect' });
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ message: 'Email or password incorrect' });
    }

    const token = await generateJWT(user._id, user.name);

    return res.json({
      uid: user._id,
      name: user.name,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Please talk with administrator' });
  }

  res.json({
    email,
  });
};

const renewToken = async (req, res) => {
  const { uid, name } = req.user;

  const token = await generateJWT(uid, name);

  return res.json({
    token,
  });
};

module.exports = {
  createUser,
  loginUser,
  renewToken,
};
