module.exports = app => {
    const Student= require("../controller/controller.js");
  
    var router = require("express").Router();
  
    router.post("/", Student.create);
  

    router.get("/", Student.findAll);

    router.get("/graduated", Student.findAllGraduated);

  
    router.get("/:id", Student.findOne);
  

    router.put("/:id", Student.update);
  

    router.delete("/:id", Student.delete);
  

    router.delete("/", Student.deleteAll);
  
    app.use("/api/students", router);
  };