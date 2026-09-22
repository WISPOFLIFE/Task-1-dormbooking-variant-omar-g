import Joi from 'joi';
import { Booking } from '../models/Booking.js';

const createBookingSchema = Joi.object({
  roomNumber: Joi.string().trim().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().greater(Joi.ref('startDate')).required(),
  purpose: Joi.string().trim().allow('').optional(),
  bookedBy: Joi.string().required(),
});

const updateBookingSchema = Joi.object({
  roomNumber: Joi.string().trim(),
  startDate: Joi.date(),
  endDate: Joi.date(),
  purpose: Joi.string().trim().allow(''),
  bookedBy: Joi.string(),
}).min(1);

const validateDateRange = (startDate, endDate) => {
  if (!startDate || !endDate) return null;
  if (new Date(startDate).getTime() >= new Date(endDate).getTime()) {
    return 'startDate must be strictly before endDate';
  }
  return null;
};

const findOverlap = async (roomNumber, startDate, endDate, excludeId = null) => {
  const query = {
    roomNumber,
    startDate: { $lt: new Date(endDate) },
    endDate: { $gt: new Date(startDate) },
  };

  if (excludeId) {
    query._id = { $ne: excludeId };
  }

  return Booking.findOne(query);
};

export async function getAllBookings(req, res, next) {
  try {
    const bookings = await Booking.find()
      .populate('bookedBy', 'username email role');
    res.json(bookings);
  } catch (err) {
    next(err);
  }
}

export async function getBooking(req, res, next) {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('bookedBy', 'username email role');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(booking);
  } catch (err) {
    next(err);
  }
}

export async function createBooking(req, res, next) {
  try {
    const { error, value } = createBookingSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        message: 'Validation error',
        details: error.details.map((detail) => detail.message),
      });
    }

    const dateError = validateDateRange(value.startDate, value.endDate);
    if (dateError) {
      return res.status(400).json({ message: dateError });
    }

    const conflict = await findOverlap(value.roomNumber, value.startDate, value.endDate);
    if (conflict) {
      return res.status(409).json({
        message: 'This room is already booked for the selected date range',
      });
    }

    const booking = new Booking({
      roomNumber: value.roomNumber,
      startDate: value.startDate,
      endDate: value.endDate,
      purpose: value.purpose || '',
      bookedBy: value.bookedBy,
    });

    await booking.save();
    const populatedBooking = await Booking.findById(booking._id).populate('bookedBy', 'username email role');

    res.status(201).json({ message: 'Booking created successfully', booking: populatedBooking });
  } catch (err) {
    next(err);
  }
}

export async function updateBooking(req, res, next) {
  try {
    const existing = await Booking.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const { error, value } = updateBookingSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        message: 'Validation error',
        details: error.details.map((detail) => detail.message),
      });
    }

    const merged = {
      ...existing.toObject(),
      ...value,
    };

    const dateError = validateDateRange(merged.startDate, merged.endDate);
    if (dateError) {
      return res.status(400).json({ message: dateError });
    }

    const conflict = await findOverlap(
      merged.roomNumber || existing.roomNumber,
      merged.startDate || existing.startDate,
      merged.endDate || existing.endDate,
      existing._id
    );

    if (conflict) {
      return res.status(409).json({
        message: 'This room is already booked for the selected date range',
      });
    }

    if (value.roomNumber) existing.roomNumber = value.roomNumber;
    if (value.startDate) existing.startDate = value.startDate;
    if (value.endDate) existing.endDate = value.endDate;
    if (value.purpose !== undefined) existing.purpose = value.purpose;
    if (value.bookedBy) existing.bookedBy = value.bookedBy;

    await existing.save();
    const populatedBooking = await Booking.findById(existing._id).populate('bookedBy', 'username email role');

    res.json({ message: 'Booking updated successfully', booking: populatedBooking });
  } catch (err) {
    next(err);
  }
}

export async function deleteBooking(req, res, next) {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json({ message: 'Booking deleted successfully' });
  } catch (err) {
    next(err);
  }
}