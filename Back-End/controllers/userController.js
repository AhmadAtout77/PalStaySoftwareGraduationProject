const bcrypt = require('bcrypt');
const { generateToken } = require('../middlewares/authMiddleware');
const User = require('../models/user');

const createUser = async (req, res) => {
    try {
        let { username, phoneNumber, email, password ,role} = req.body;
        if(role!='admin' || role=='undefiend'){
            role='user';
        }

        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already registered' });
        }

        // If the email is not registered, proceed to create the user
        const newUser = new User({ username, phoneNumber, email, password, role });
        
        // Hash the password before saving
        const saltRounds = 10;
        newUser.password = await bcrypt.hash(password, saltRounds);

        await newUser.save();

        // Generate a JWT token
        const token = generateToken({ user: newUser });

        // Include the token in the response
        res.status(201).json({ user: newUser, token });
    } catch (error) {
        res.status(500).json({   error: error.message });
    }
};
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find the user based on the provided email
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Compare the provided password with the stored hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);
        
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate a JWT token for the authenticated user
        const token = generateToken(user);

        // Send the token in the response
        res.json({ user, token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getAllUsers = async (req, res) => {
    try {
        // Find all users with role 'user'
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// An example function to store the user's FCM token
const updateUserFCMToken = async (req, res) => {
    const { userId } = req.params;
    const { fcmToken } = req.body;
  
    try {
      // Update the user document with the new FCM token
      // The specifics of this will depend on how your user documents are structured
      await User.findByIdAndUpdate(userId, { fcmToken });
      res.status(200).json({ message: 'FCM token updated successfully' });
    } catch (error) {
      console.error('Error updating FCM token:', error);
      res.status(500).json({ error: error.message });
    }
  };
  
  // Don't forget to add the appropriate route for this controller function
  
module.exports = {
    createUser,
    loginUser,
    getUserById,
    updateUser,
    deleteUser,
    updateUserFCMToken,
    getAllUsers
};
