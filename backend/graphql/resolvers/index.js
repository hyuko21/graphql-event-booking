'use strict';

const Event = require('../../models/event');
const User = require('../../models/user');
const Booking = require('../../models/booking');

const responses = {
  user: instance => ({
    ...instance._doc,
    createdEvents: () => events(instance.createdEvents)
  }),
  event: instance => ({
    ...instance._doc,
    date: new Date(instance.date).toISOString(),
    creator: () => user(instance.creator)
  }),
  booking: instance => ({
    ...instance._doc,
    event: () => singleEvent(instance.event),
    user: () => user(instance.user),
    createdAt: new Date(instance.createdAt).toISOString(),
    updatedAt: new Date(instance.updatedAt).toISOString()
  })
};

async function user(userId) {
  const user = await User.findById(userId).select('-password');

  return responses.user(user);
}

async function events(eventsIds) {
  const events = await Event.find({ _id: { $in: eventsIds }});

  return events.map(event => responses.event(event));
}

async function singleEvent(eventId) {
  const event = await Event.findById(eventId);

  return responses.event(event);
}

module.exports = {
  async events() {
    const events = await Event.find();

    return events.map(event => responses.event(event));
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
  async bookings() {
    const bookings = await Booking.find();

    return bookings.map(booking => responses.booking(booking));
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

    return responses.event(event);
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

    return responses.user(user);
  },
  async bookEvent({ eventId }) {
    const fetchedEvent = await Event.findOne({ _id: eventId });

    if (!fetchedEvent) {
      throw Error('Event not found');
    }

    const booking = new Booking({
      user: '5d93b9afb0c44124a7de9c26',
      event: fetchedEvent.id
    });

    await booking.save();

    return responses.booking(booking);
  },
  async cancelBooking({ bookingId }) {
    const booking = await Booking.findByIdAndDelete(bookingId).populate('event');

    if (!booking) {
      throw Error('Booking not found');
    }

    return responses.event(booking.event);
  }
}