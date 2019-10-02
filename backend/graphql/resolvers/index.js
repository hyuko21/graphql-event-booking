'use strict';

const Event = require('../../models/event');
const User = require('../../models/user');

async function user(userId) {
  const user = await User.findById(userId).select('-password');

  return {
    ...user._doc,
    createdEvents: () => events(user.createdEvents)
  };
}

async function events(eventsIds) {
  const events = await Event.find({ _id: { $in: eventsIds }});

  return events.map(event => {
    return {
      ...event._doc,
      creator: () => user(event.creator)
    };
  });
}

module.exports = {
  async events() {
    const events = await Event.find();

    return events.map(event => {
      return {
        ...event._doc,
        creator: () => user(event.creator)
      };
    });
  },
  async users() {
    const users = await User.find().select('-password');
    
    return users.map(user => {
      return {
        ...user._doc,
        createdEvents: () => events(user.createdEvents)
      };
    });
  },
  async createEvent({ eventInput }) {
    const event = new Event({
      title: eventInput.title,
      description: eventInput.description,
      price: eventInput.price,
      date: new Date(eventInput.date),
      creator: '5d93b9afb0c44124a7de9c26'
    });

    const creator = await User.findById(event.creator);

    if (!creator) {
      throw Error('User not found');
    }

    creator.createdEvents.push(event);
    creator.save();

    await event.save();

    return {
      ...event._doc,
      creator: () => user(event.creator)
    };
  },
  async createUser({ userInput }) {
    let user = await User.findOne({ email: userInput.email });

    if (user) {
      throw Error('User already exists')
    }

    user = new User({
      email: userInput.email,
      password: userInput.password
    });

    await user.save();

    return { ...user._doc, password: undefined, createdEvents: () => events(user.createdEvents) };
  }
}