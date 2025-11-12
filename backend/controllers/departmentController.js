const Department = require('../models/Department');

// Get all departments
exports.getAllDepartments = async (req, res) => {
    try {
        const departments = await Department.find();
        res.json(departments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get single department
exports.getDepartmentById = async (req, res) => {
    try {
        const department = await Department.findById(req.params.id);
        if(!department) return res.status(404).json({ message: 'Department not found' });
        res.json(department);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create department (Admin only)
exports.createDepartment = async (req, res) => {
    try {
        const { name, description } = req.body;
        const department = new Department({ name, description });
        await department.save();
        res.status(201).json(department);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update department (Admin only)
exports.updateDepartment = async (req, res) => {
    try {
        const department = await Department.findById(req.params.id);
        if(!department) return res.status(404).json({ message: 'Department not found' });

        const { name, description } = req.body;
        if(name) department.name = name;
        if(description) department.description = description;

        await department.save();
        res.json(department);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete department (Admin only)
exports.deleteDepartment = async (req, res) => {
    try {
        const department = await Department.findById(req.params.id);
        if(!department) return res.status(404).json({ message: 'Department not found' });

        await department.remove();
        res.json({ message: 'Department deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
