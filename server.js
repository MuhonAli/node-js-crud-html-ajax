const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;
const Item = require('./models/Item');

// Middleware to parse JSON data
app.use(express.json());
app.use(express.static('public')); 
app.use(bodyParser.json()); 

// Create a new item
app.post('/items', async (req, res) => {
    try {
        console.log('Request Body:', req.body); // Log the request body
        const item = new Item(req.body);
        
        await item.save();
        res.status(201).send(item);
        console.log('Item added');
    } catch (error) {
        res.status(400).send(error);
    } 
});


// Read all items
app.get('/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Read a single item by ID
app.get('/items/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).send();
        }
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update an item by ID
app.patch('/items/:id', async (req, res) => {
    try {
        const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!item) {
            return res.status(404).send();
        }
        res.status(200).send(item);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete an item by ID
app.delete('/items/:id', async (req, res) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id);
        if (!item) {
            return res.status(404).send();
        }
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send(error);
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/node_js_crud', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected!'))
.catch((err) => console.error('MongoDB connection error:', err));

