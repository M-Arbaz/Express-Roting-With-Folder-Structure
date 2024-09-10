const mongoose = require('mongoose');
const dbURL = process.env.DB_URL;

function dbConnection(){
    try {
        mongoose.connect(dbURL , {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
            .then(() => {
                console.log("connection succesful")
            })
            .catch((err) => {
                console.error(err, "14")
            })
    } catch (error) {
        console.log("error while connection")
    }
}
module.exports = dbConnection;
