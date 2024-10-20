const mongoose = require('mongoose');

// Define the schema for the item
const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create the model
const Item = mongoose.model('Item', itemSchema);

// Export the model
module.exports = Item;
