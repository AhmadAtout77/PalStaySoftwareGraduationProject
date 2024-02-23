// controllers/bookingController.js
const Booking = require('../models/booking');

const createBooking = async (req, res) => {
    try {
        // Check if the user is authenticated
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const newBooking = new Booking(req.body);
        await newBooking.save();
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getAllBookings = async (req, res) => {
  try {
      const bookings = await Booking.find().populate('user').populate('propertyId').populate('owner');
      res.status(200).json(bookings);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

const getBookingById = async (req, res) => {
    try {
        // Check if the user is authenticated
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const booking = await Booking.findById(req.params.id);
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateBooking = async (req, res) => {
    try {
        // Check if the user is authenticated
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const updatedBooking = await Booking.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedBooking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteBooking = async (req, res) => {
    try {
        // Check if the user is authenticated
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        await Booking.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getBookingRequests = async (req, res) => {
    try {
        // Assuming req.user.id contains the owner's user ID
        const ownerId = req.headers['x-user-id']; // Access the user ID from the header
        console.log("ownerid",ownerId);
        const requests = await Booking.find({ status: 'pending', owner: ownerId })
                                      .populate('propertyId')
                                      .populate('user');
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUserBookings = async (req, res) => {
  try {
    const userId =  req.headers['x-user-id'];
    console.log("here at user booking ",userId);
    // Assumed to be set from the verifyToken middleware
    const userBookings = await Booking.find({status: 'confirmed', user: userId }).populate('propertyId').populate('owner');

    res.status(200).json(userBookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

  const confirmBooking = async (req, res) => {
    try {
      const updatedBooking = await Booking.findByIdAndUpdate(
        req.params.id,
        { status: 'confirmed' },
        { new: true }
      ).populate('owner').populate('propertyId');
      res.status(200).json(updatedBooking);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const cancelBooking = async (req, res) => {
    try {
      const updatedBooking = await Booking.findByIdAndUpdate(
        req.params.id,
        { status: 'cancelled' },
        { new: true }
      ).populate('owner').populate('propertyId');
      res.status(200).json(updatedBooking);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const getConfirmedBookingsForProperty = async (req, res) => {
    try {
      const bookings = await Booking.find({
        propertyId: req.params.propertyId,
        status: 'confirmed'
      }).populate('user').populate('owner'); // Assuming you want to show user details in the booking
      res.status(200).json(bookings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const getConfirmedBookingsForPropertyDates = async (req, res) => {
    try {
      const bookings = await Booking.find({
        propertyId: req.params.propertyId,
        status: 'confirmed'
      }, 'startDate endDate'); // Select only startDate and endDate fields
  
      // Transform the data to return only the dates
      const bookedDates = bookings.map(booking => ({
        startDate: booking.startDate,
        endDate: booking.endDate
      }));
  
      res.status(200).json(bookedDates);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  
     
module.exports = {
    createBooking,
    getBookingById,
    updateBooking,
    deleteBooking,
    getBookingRequests,
    confirmBooking,
    cancelBooking,
    getConfirmedBookingsForProperty,
    getUserBookings,
    getConfirmedBookingsForPropertyDates,
    getAllBookings
};
