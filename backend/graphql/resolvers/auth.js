'use strict';

const User = require('../../models/user');
const {
  transform: {
    user: transformUser
  }
} = require('./merge');

module.exports = {
  async users() {
    const users = await User.find().select('-password');
    
    return users.map(user => transformUser(user));
  },
  async createUser({ userInput }) {
    const existingUser = await User.findOne({ email: userInput.email });

    if (existingUser) {
      throw Error('User already exists')
    }

    const user = new User({
      email: userInput.email,
      password: userInput.password
    });

    await user.save();

    return transformUser(user);
  }
};