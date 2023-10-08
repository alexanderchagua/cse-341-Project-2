const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        //#swagger.tags=['Employees']
        const result = await mongodb.getDatabase().db().collection('employees').find();
        const employees = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getSingle = async (req, res) => {
    try {
        //#swagger.tags=['Employees']
        const employeesId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('employees').find({ _id: employeesId });
        const employees = await result.toArray();
        if (employees.length === 0) {
            res.status(404).json({ error: 'Employee not found' });
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(employees[0]);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createDate = async (req, res) => {
    try {
        //#swagger.tags=['Employees']
        const employee = {
            name: req.body.name,
            last_name: req.body.last_name,
            age: req.body.age,
            safety_equipment: req.body.safety_equipment,
            trainings: req.body.trainings
        };
        const response = await mongodb.getDatabase().db().collection('employees').insertOne(employee);
        if (response.acknowledged) {
            res.status(201).send(response);
        } else {
            res.status(500).json({ error: 'Some error occurred while creating the employee entry.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateDate = async (req, res) => {
    try {
        //#swagger.tags=['Employees']
        const employeeId = new ObjectId(req.params.id);
        const employee = {
            name: req.body.name,
            last_name: req.body.last_name,
            age: req.body.age,
            safety_equipment: req.body.safety_equipment,
            trainings: req.body.trainings
        };
        const response = await mongodb.getDatabase().db().collection('employees').replaceOne({ _id: employeeId }, employee);
        if (response.modifiedCount > 0) {
            res.status(204).send(response);
        } else {
            res.status(400).json("Invalid ID entered. Please try again");
        }
    } catch (error) {
        res.status(500).json(response.error || "An error occurred. Please try again");
    }
};

const deleteDate = async (req, res) => {
    try {
        //#swagger.tags=['Employees']
        const employeeId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('employees').deleteOne({ _id: employeeId });
        if (response.deletedCount > 0) {
            res.status(200).send(response);
        } else {
            res.status(500).json({ error: 'Some error occurred while deleting the employee entry.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    createDate,
    updateDate,
    deleteDate,
};