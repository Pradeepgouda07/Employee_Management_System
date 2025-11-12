const User = require('../models/User');
const bcrypt = require('bcrypt');

// Get all employees (Admin only)
exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await User.find({ role: 'employee' }).populate('departmentId', 'name');
        res.json(employees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get single employee
exports.getEmployeeById = async (req, res) => {
    try {
        const employee = await User.findById(req.params.id).populate('departmentId', 'name');
        if (!employee) return res.status(404).json({ message: 'Employee not found' });
        res.json(employee);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create employee (Admin only)
exports.createEmployee = async (req, res) => {
    try {
        const { name, email, password, departmentId } = req.body;
        const hashed = await bcrypt.hash(password, 10);
        const employee = new User({ name, email, password: hashed, role: 'employee', departmentId });
        await employee.save();
        res.status(201).json(employee);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update employee (Admin only)
exports.updateEmployee = async (req, res) => {
    try {
        const employee = await User.findById(req.params.id);
        if (!employee) return res.status(404).json({ message: 'Employee not found' });

        const { name, email, password, departmentId } = req.body;
        if(name) employee.name = name;
        if(email) employee.email = email;
        if(password) employee.password = await bcrypt.hash(password, 10);
        if(departmentId) employee.departmentId = departmentId;

        await employee.save();
        res.json(employee);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete employee (Admin only)
exports.deleteEmployee = async (req, res) => {
    try {
        const employee = await User.findById(req.params.id);
        if (!employee) return res.status(404).json({ message: 'Employee not found' });

        await employee.remove();
        res.json({ message: 'Employee deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
