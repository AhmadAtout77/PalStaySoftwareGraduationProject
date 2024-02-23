const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const admin = require('./config/firebaseAdmin'); // Adjust the path as necessary
const notificationRoutes = require('./routes/notificationRoutes')
const listEndpoints = require('express-list-endpoints');
require('dotenv').config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 2000;

const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Set up multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Save files in the 'uploads' directory
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });
app.use('/static', express.static(path.join(__dirname, 'uploads')));

// Handling file uploads
app.post('/upload', upload.fields([{ name: 'images', maxCount: 5 }, { name: 'video', maxCount: 1 }]), (req, res) => {
    // Multer middleware has added the files to the request object
    const images = req.files['images'] || [];
    const video = req.files['video'] ? req.files['video'][0] : null;

    // Create an array of image paths
    const imagePaths = images.map((file) => `/${file.filename}`);

    // Send the array of image paths and video path in the response
    res.json({ imagePaths, videoPath: video ? `/${video.filename}` : null });
});

// Include routes
app.use('/users', require('./routes/userRoutes'));
app.use('/properties', require('./routes/propertyRoutes'));
app.use('/bookings', require('./routes/bookingRoutes'));
app.use('/reviews', require('./routes/reviewRoutes'));
app.use('/wishlist', require('./routes/wishlistRoutes'));
app.use('/chat', require('./routes/chatRoutes'));
app.use('/notifications', notificationRoutes);

// Print the list of routes to the console
console.log(listEndpoints(app));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
