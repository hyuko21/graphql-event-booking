'use strict';

const Event = require('../../models/event');
const Booking = require('../../models/booking');
const {
  transform: {
    event: transformEvent,
    booking: transformBooking
  }
} = require('./merge');

module.exports = {
  async bookings(_, req) {
    if (!req.isAuth) {
      throw Error('Unauthenticated');
    }

    const bookings = await Booking.find({ user: req.userId });

    return bookings.map(booking => transformBooking(booking));
  },
  async bookEvent({ eventId }, req) {
    if (!req.isAuth) {
      throw Error('Unauthenticated');
    }

    const fetchedEvent = await Event.findOne({ _id: eventId });

    if (!fetchedEvent) {
      throw Error('Event not found');
    }

    const booking = new Booking({
      user: req.userId,
      event: fetchedEvent.id
    });

    await booking.save();

    return transformBooking(booking);
  },
  async cancelBooking({ bookingId }, req) {
    if (!req.isAuth) {
      throw Error('Unauthenticated');
    }

    const booking = await Booking.findOneAndDelete({
      _id: bookingId,
      user: req.userId
    }).populate('event');

    if (!booking) {
      throw Error('Booking not found');
    }

    return transformEvent(booking.event);
  }
};