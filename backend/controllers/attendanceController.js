const Attendance = require('../models/Attendance');

// Mark attendance (Employee)
exports.markAttendance = async (req, res) => {
    try {
        const { date, status } = req.body; // present/absent/on_leave
        if(!['present','absent','on_leave'].includes(status)) return res.status(400).json({ message: 'Invalid status' });

        let attendance = await Attendance.findOne({ userId: req.user.id, date });
        if(attendance) {
            attendance.status = status; // Update if already exists
        } else {
            attendance = new Attendance({ userId: req.user.id, date, status });
        }

        await attendance.save();
        res.json(attendance);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get my attendance (Employee)
exports.getMyAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.find({ userId: req.user.id });
        res.json(attendance);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all attendance (Admin)
exports.getAllAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.find().populate('userId', 'name email');
        res.json(attendance);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
