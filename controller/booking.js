const { insertRecords, getRecords, updateRecords, deleteRecords } = require("../dbInterface");
const { ObjectId } = require('mongodb');

const confirmBooking = async (req, res) => {
  const bookingDetails = req.body;
  const { startTime, endTime } = bookingDetails;

  const conflictQuery = {
    $or: [
      { startTime: { $lt: endTime, $gte: startTime } },
      { endTime: { $gt: startTime, $lte: endTime } },
      { startTime: { $lte: startTime }, endTime: { $gte: endTime } }
    ]
  };
  
  const conflictingBookings = await getRecords('bookings', conflictQuery);
  
  if (conflictingBookings.length > 0) {
    return res.status(409).send({ status: 'error', message: 'Booking conflict: A booking already exists within the given time frame.' });
  }

  await insertRecords('bookings', bookingDetails);
  res.status(200).send({ status: 'success', message: 'Booking confirmed' });
};

const getBookings = async (req, res) => {
  let id = req.query.id;
  const query = {};
  if (id) {
    query['_id'] = new ObjectId(String(id));
  }
  let bookings = await getRecords('bookings', query);
  if (id) {
    bookings = bookings[0];
  }
  res.status(200).send({ status: 'success', data: bookings });
};

const updateBooking = async (req, res) => {
  const id = new ObjectId(String(req.body._id));
  const query = { _id: id };
  delete req.body['_id'];
  const updatedRecord = { $set: req.body };
  await updateRecords('bookings', query, updatedRecord);
  res.status(200).send({ status: 'success', message: 'Booking successfully updated' });
};

const deleteBooking = async (req, res) => {
  const query = { _id: new ObjectId(String(req.query.id)) };
  await deleteRecords('bookings', query);
  res.status(200).send({ status: 'success', message: 'Booking successfully deleted' });
};

module.exports = { confirmBooking, updateBooking, getBookings, deleteBooking };
