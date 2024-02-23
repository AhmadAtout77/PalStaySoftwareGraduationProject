// controllers/propertyController.js
const Property = require('../models/property');

const createProperty = async (req, res) => {
    try {
        // Check if the user is authenticated (you can access user information from req.user)
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const newProperty = new Property(req.body);
        await newProperty.save();
        res.status(201).json(newProperty);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getAllProperties = async(req,res) =>{
        try {
            // You can add more filters by checking req.query and adjusting the query accordingly
            const properties = await Property.find({ valid: true }).populate('owner');
            console.log("propt",properties)
            res.status(200).json(properties);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    
    
}
const getUserProperties = async (req, res) => {
    try {
        // Check if the user is authenticated
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }


        // Retrieve properties for the authenticated user
        const userProperties = await Property.find({ owner: req.params.id ,valid:true}).populate('owner');

        res.status(200).json(userProperties);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getPropertyById = async (req, res) => {
    try {
        // Check if the user is authenticated
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const property = await Property.findById(req.params.id).populate('owner');;
        res.status(200).json(property);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateProperty = async (req, res) => {
    try {
        // Check if the user is authenticated
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const updatedProperty = await Property.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedProperty);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteProperty = async (req, res) => {
    try {
        // Check if the user is authenticated
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        await Property.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const confirmProperty = async (req, res) => {
    try {
        const property = await Property.findByIdAndUpdate(
            req.params.id,
            { valid: true });
        res.status(200).json(property);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getInvalidProperties = async (req, res) => {
    try {
        const invalidProperties = await Property.find({ valid: false }).populate('owner');
        res.status(200).json(invalidProperties);
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// controllers/propertyController.js
const searchProperties = async (req, res) => {
    try {
        // Extract query parameters
        const { type, minPrice, maxPrice, location, rooms, bathrooms, facilities } = req.query;

        let query = {};
        if (type) query.type = type;
        if (minPrice) query.price = { $gte: parseInt(minPrice) };
        if (maxPrice) query.price = { ...query.price, $lte: parseInt(maxPrice) };
        if (location) query['location.city'] = location;
        if (rooms) query.rooms = parseInt(rooms);
        if (bathrooms) query.bathrooms = parseInt(bathrooms);
        if (facilities) query.facilities = { $all: facilities.split(",") }; // Assuming facilities is a comma-separated string
        query.valid=true;
        const properties = await Property.find(query).populate("owner");
        console.log("proprites search",properties);
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getOfferProperty = async (req, res) => {
    try {
        // Check if the user is authenticated
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const propertiesWithOffers = await Property.find({ 
            'offer.isActive': true, 
            'offer.discountPercent': { $gt: 0 } // $gt is 'greater than' in MongoDB
        });        res.status(200).json(propertiesWithOffers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
module.exports = {
    createProperty,
    getPropertyById,
    updateProperty,
    deleteProperty,
    getUserProperties,
    searchProperties,
    getOfferProperty,
    getInvalidProperties,
    confirmProperty,
    getAllProperties
};
