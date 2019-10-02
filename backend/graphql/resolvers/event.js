'use strict';

const Event = require('../../models/event');
const {
  transform: {
    event: transformEvent
  }
} = require('./merge');

module.exports = {
  async events() {
    const events = await Event.find();

    return events.map(event => transformEvent(event));
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

    return transformEvent(event);
  }
};