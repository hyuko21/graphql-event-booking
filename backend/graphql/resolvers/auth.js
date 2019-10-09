'use strict';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');
const {
  transform: {
    user: transformUser
  }
} = require('./merge');

module.exports = {
  async users() {
    const users = await User.find();
    
    return users.map(user => transformUser(user));
  },
  async createUser({ userInput }) {
    const existingUser = await User.findOne({ email: userInput.email });

    if (existingUser) {
      throw Error('User already exists')
    }

    const hashedPassword = await bcrypt.hash(userInput.password, 10);

    const user = new User({
      email: userInput.email,
      password: hashedPassword
    });

    await user.save();

    return transformUser(user);
  },
  async login({ email, password }) {
    const user = await User.findOne({ email });

    if (!user) {
      throw Error('User does not exist');
    }

    const isPasswordEqual = await bcrypt.compare(password, user.password);

    if (!isPasswordEqual) {
      throw Error('Password is incorrect');
    }

    const token = await jwt.sign(
      {
        userId: user.id,
        email: user.email
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1h' }
    );

    return { userId: user.id, token, tokenExpiration: 1 };
  }
};