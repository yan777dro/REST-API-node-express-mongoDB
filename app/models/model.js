module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        firstName: String,
        lastName: String,
        Major: String,
        GPA: String,
        Graduated: Boolean
      },
      { timestamps: true }  // automatically adds createAt & updateAT properties to the schema
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject(); 
      object.id = _id;
      return object;
    });
  
    const Student = mongoose.model("students", schema);
    return Student;
  };