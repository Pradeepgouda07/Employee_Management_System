const Salary = require('../models/Salary');

// Get all salaries (Admin only)
exports.getAllSalaries = async (req, res) => {
    try {
        const salaries = await Salary.find().populate('userId', 'name email');
        res.json(salaries);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get salary by employee
exports.getSalaryByUser = async (req, res) => {
    try {
        const salary = await Salary.findOne({ userId: req.params.userId }).populate('userId', 'name email');
        if(!salary) return res.status(404).json({ message: 'Salary not found' });
        res.json(salary);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create or update salary (Admin only)
exports.createOrUpdateSalary = async (req, res) => {
    try {
        const { userId, basic, bonus, deductions } = req.body;
        let salary = await Salary.findOne({ userId });

        if(salary) {
            // Update existing
            salary.basic = basic;
            salary.bonus = bonus;
            salary.deductions = deductions;
            await salary.save();
            res.json(salary);
        } else {
            // Create new
            salary = new Salary({ userId, basic, bonus, deductions });
            await salary.save();
            res.status(201).json(salary);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete salary (Admin only)
exports.deleteSalary = async (req, res) => {
    try {
        const salary = await Salary.findById(req.params.id);
        if(!salary) return res.status(404).json({ message: 'Salary not found' });
        await salary.remove();
        res.json({ message: 'Salary deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
