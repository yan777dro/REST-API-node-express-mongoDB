const db = require("../models");
const Employee = db.employees;


exports.create = (req, res) => {
  
  if (!req.body.Occupation && !req.body.Department && !req.body.lastName) {
    res.status(400).send({ message: "This fields cannot be empty!" });
    return;
  }


  const employee = new Employee({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    Occupation: req.body.Occupation,
    Department: req.body.Department,
    Salary:     req.body.Salary
  });

  
  employee
    .save(employee)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error occured while creating a new employee."
      });
    });
};


exports.findAll = (req, res) => {   // find all employees by occupation as our condition to retrieve them
  const find = req.query.Occupation;
  var condition = find ? { Occupation: { $regex: new RegExp(find), $options: "i" } } : {}; 
  //RegExp regular expression object for matching text with a pattern
  

  Employee.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error occured while retreiving all employees by Occupation."
      });
    });
};


exports.findOne = (req, res) => {
  const id = req.params.id;                  

  Employee.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Employee not found with id" + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Cannot retrieve employee with id=" + id });
    });
};


exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Please complete all fields!"
    });
  }

  const id = req.params.id;

  Employee.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: 'Cannot update employee with id= ${id}'
        });
      } else res.send({ message: "Employee updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating employee with id=" + id
      });
    });
};


exports.delete = (req, res) => {
  const id = req.params.id;

  Employee.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete employee with id=${id}.`
        });
      } else {
        res.send({
          message: "Employee deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Cannot delete employee with id=" + id
      });
    });
};


exports.deleteAll = (req, res) => {
  Employee.deleteMany({})
    .then(data => {
      res.send({
        message: ` All employees have been deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error occured while deleting employees."
      });
    });
};
