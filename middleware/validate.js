const validator = require('../helpers/validate');

const validateEmployee = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    last_name: 'required|string',
    age: 'required|int',
    safety_equipment: 'required|string',
    trainings: 'int'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
    validateEmployee
};