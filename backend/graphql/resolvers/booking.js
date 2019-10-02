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
  async bookings() {
    const bookings = await Booking.find();

    return bookings.map(booking => transformBooking(booking));
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

    return transformBooking(booking);
  },
  async cancelBooking({ bookingId }) {
    const booking = await Booking.findByIdAndDelete(bookingId).populate('event');

    if (!booking) {
      throw Error('Booking not found');
    }

    return transformEvent(booking.event);
  }
};