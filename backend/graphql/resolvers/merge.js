'use strict';

const User = require('../../models/user');
const Event = require('../../models/event');

const { dateToString } = require('../../helpers/date');

const query = {
  async user(userId) {
    const user = await User.findById(userId).select('-password');

    return transform.user(user);
  },

  async events(eventsIds) {
    const events = await Event.find({ _id: { $in: eventsIds }});

    return events.map(event => transform.event(event));
  },

  async singleEvent(eventId) {
    const event = await Event.findById(eventId);

    return transform.event(event);
  }
};

const transform = {
  async user(instance) {
    return {
      ...instance._doc,
      createdEvents: () => query.events(instance.createdEvents)
    };
  },

  async event(instance) {
    return {
      ...instance._doc,
      date: dateToString(instance.date),
      creator: () => query.user(instance.creator)
    };
  },

  async booking(instance) {
    return {
      ...instance._doc,
      event: () => query.singleEvent(instance.event),
      user: () => query.user(instance.user),
      createdAt: dateToString(instance.createdAt),
      updatedAt: dateToString(instance.updatedAt)
    };
  }
};

module.exports = {
  query,
  transform
};