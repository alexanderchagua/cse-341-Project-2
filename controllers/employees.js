const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['employees']
    const result = await mongodb.getDatabase().db().collection('employees').find();
    result.toArray().then((dates) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(dates);
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['employees']
    const dateId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('employees').find({ _id: dateId });
    result.toArray().then((dates) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(dates[0]);
    });
};

const createDate = async (req, res) => {
    //#swagger.tags=['employees']
    const date = {
        area: req.body.area,
        name: req.body.name,
        old: req.body.old,
        epp: req.body.epp
    };
    const response = await mongodb.getDatabase().db().collection('employees').insertOne(date);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the date entry.');
    }
};

const updateDate = async (req, res) => {
    //#swagger.tags=['employees']
    const dateId = new ObjectId(req.params.id);
    const date = {
        area: req.body.area,
        name: req.body.name,
        old: req.body.old,
        epp: req.body.epp
    };
    const response = await mongodb.getDatabase().db().collection('employees').replaceOne({ _id: dateId }, date);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the date entry.');
    }
};

const deleteDate = async (req, res) => {
    //#swagger.tags=['Dates']
    const dateId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('employees').deleteOne({ _id: dateId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the date entry.');
    }
};

module.exports = {
    getAll,
    getSingle,
    createDate,
    updateDate,
    deleteDate,
};