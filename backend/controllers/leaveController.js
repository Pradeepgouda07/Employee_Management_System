const Leave = require('../models/Leave');

// Get all leaves (Admin only)
exports.getAllLeaves = async (req, res) => {
    try {
        const leaves = await Leave.find().populate('userId', 'name email');
        res.json(leaves);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get leaves of logged-in employee
exports.getMyLeaves = async (req, res) => {
    try {
        const leaves = await Leave.find({ userId: req.user.id });
        res.json(leaves);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Apply for leave (Employee)
exports.applyLeave = async (req, res) => {
    try {
        const { startDate, endDate, reason } = req.body;
        const leave = new Leave({ userId: req.user.id, startDate, endDate, reason });
        await leave.save();
        res.status(201).json(leave);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Approve or reject leave (Admin only)
exports.updateLeaveStatus = async (req, res) => {
    try {
        const leave = await Leave.findById(req.params.id);
        if(!leave) return res.status(404).json({ message: 'Leave not found' });

        const { status } = req.body; // approved/rejected
        if(!['approved','rejected'].includes(status)) return res.status(400).json({ message: 'Invalid status' });

        leave.status = status;
        await leave.save();
        res.json(leave);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
