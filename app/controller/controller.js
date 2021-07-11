const db = require("../models");
const Student = db.students;




exports.create = (req, res) => {
  
    if ( !req.body.firstName  && !req.body.lastName && !req.body.Major && !req.body.GPA && !req.body.Graduated) {
      res.status(400).send({ message: "All fields are required and cannot be empty!" });
      return;
    }
    
  
    const student = new Student({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      Major: req.body.Major,
      GPA: req.body.GPA,
      Graduated: req.body.Graduated ? req.body.Graduated : false
    });
  
    
    student
      .save(student)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Error occured, cannot add a new student."
        });
      });
  };

  exports.findAll = (req, res) => {   
    const find = req.query.lastName || req.query.Major;
    var condition = find ? { FindStudent: { $regex: new RegExp(find), $options: "i" } } : {}; 
    
    
  
    Student.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Error occured while retreiving all students."
        });
      });
  };

  exports.findAllGraduated = (_req, res) => {


    Student.find({ Graduated: true})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Error occurred while retrieving students."
        });
      });
  };

  exports.findOne = (req, res) => {
    const id = req.params.id;                  
  
    Student.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Student not found with id" + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Cannot retrieve student with id=" + id });
      });
  };

  
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Please complete all required fields!"
      });
    }
  
    const id = req.params.id;
  
    Student.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: 'Cannot update student with id= ${id}'
          });
        } else res.send({ message: "Student updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating student with id=" + id
        });
      });
  };

  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Student.findByIdAndRemove(id, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete student with id=${id}.`
          });
        } else {
          res.send({
            message: "Student deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Cannot delete student with id=" + id
        });
      });
  };

  exports.deleteAll = (req, res) => {
    Student.deleteMany({})
      .then(data => {
        res.send({
          message: ` All students have been deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Error occured while deleting students."
        });
      });
  };
  