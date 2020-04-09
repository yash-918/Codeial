// require lib
const mongoose = require('mongoose');
// connect to database
mongoose.connect("mongodb://localhost/codeial_development_database");
// acquire the connection("to check up any error")
const db= mongoose.connection;
// error
db.on('error',console.error.bind(console,"error in connection"));
// up and running
db.once("open",function()
{
    console.log("succesfully connected to database(codeial_development_database)");
});
// export db
module.exports=db;


