module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        firstName: String,
        lastName: String,
        Occupation: String,
        Department: String,
        Salary: Number
      },
      { timestamps: true }  // automatically adds createAt & updateAT properties to the schema
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject(); 
      object.id = _id;
      return object;
    });
  
    const Employee = mongoose.model("employees", schema);
    return Employee;
  };