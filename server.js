const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(express.json());  

app.use(express.urlencoded({ extended: true })); 

const db = require("./app/models"); 
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch(err => {
    console.log("Error! cannot connect to database", err);
    process.exit();
  });


app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

require("./app/routes/routes")(app);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}.`);
});