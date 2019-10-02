'use strict';

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdEvents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event'
    }
  ]
});

userSchema.pre('save', async function() {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
});

module.exports = mongoose.model('User', userSchema);
