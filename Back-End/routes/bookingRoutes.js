const express = require('express');
const router = express.Router();
const BookingController = require('../controllers/bookingController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Private route to create a booking (requires authentication)
router.post('/', verifyToken, BookingController.createBooking);
// Get all bookings
router.get('/', verifyToken, BookingController.getAllBookings);

router.get('/user-bookings', verifyToken, BookingController.getUserBookings);

router.get('/requests', verifyToken, BookingController.getBookingRequests);
router.get('/property/:propertyId/confirmed', verifyToken, BookingController.getConfirmedBookingsForProperty);
router.get('/property/:propertyId/confirmed/dates', verifyToken, BookingController.getConfirmedBookingsForPropertyDates);

// Private route to get booking by ID (requires authentication)
router.get('/:id', verifyToken, BookingController.getBookingById);

// Private route to update booking by ID (requires authentication)
router.put('/:id', verifyToken, BookingController.updateBooking);

// Private route to delete booking by ID (requires authentication)
router.delete('/:id', verifyToken, BookingController.deleteBooking);


// Private route to confirm a booking (requires authentication)
router.put('/confirm/:id', verifyToken, BookingController.confirmBooking);

// Private route to cancel a booking (requires authentication)
router.put('/cancel/:id', verifyToken, BookingController.cancelBooking);

module.exports = router;
