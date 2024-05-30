const express = require('express');
const { confirmBooking, getBookings, updateBooking, deleteBooking } = require('../controller/booking');
const router = express.Router();

router.post('/booking', async (req, res) => {
  await confirmBooking(req, res);
});

router.get('/booking', async (req, res) => {
  await getBookings(req, res);
});

router.put('/booking', async (req, res) => {
  await updateBooking(req, res);
});


router.delete('/booking', async (req, res) => {
  await deleteBooking(req, res);
});



module.exports = router;