const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    status: { type: String, enum: ['present','absent','on_leave'], required: true }
});

module.exports = mongoose.model('Attendance', attendanceSchema);
