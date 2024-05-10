const express = require('express');
const mongoose = require('mongoose');
const path = require('path'); 

const app = express();

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/foodDonationDB');

// Define Donor Schema
const donorSchema = new mongoose.Schema({
    name: String,
    phone: String,
    foodQuantity: Number,
    address: String,
    city: String,
});

const Donor = mongoose.model('Donor', donorSchema);

// Serve static files with correct MIME types
app.use(express.static(path.join(__dirname, 'public'), {
    // Specify MIME types for specific file extensions
    setHeaders: (res, filePath) => {
        const extension = path.extname(filePath);
        if (extension === '.js') {
            res.setHeader('Content-Type', 'text/javascript');
        }
        else if(extension === '.css') {
            res.setHeader('Content-Type','text/css');
        }
    }
}));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/donor', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'donor.html'));
});

// Routes
app.post('/donor', async (req, res) => {
    const { name, phone, foodQuantity, address, city } = req.body;
    try {
        const newDonor = new Donor({ name, phone, foodQuantity, address, city });
        await newDonor.save();
        res.json({ message: 'Donor information saved!' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error saving donor information!' });
    }
});

app.get('/donors', async (req, res) => {
    try {
        const donors = await Donor.find();
        res.json(donors);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error retrieving donors!' });
    }
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));