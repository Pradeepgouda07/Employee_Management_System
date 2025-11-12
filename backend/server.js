const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { mongoURI } = require('./config');

const app = express();
app.use(cors());
app.use(express.json());


// Connect to MongoDB
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/employees', require('./routes/employees'));
app.use('/api/departments', require('./routes/departments'));
app.use('/api/salaries', require('./routes/salaries'));
app.use('/api/leaves', require('./routes/leaves'));
app.use('/api/attendance', require('./routes/attendance'));

// Start server
app.listen(5000, () => console.log('Server running on port 5000'));
