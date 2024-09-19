require('dotenv').config();
const port = process.env.PORT || 3001;
const express = require('express');
const app = express();  
const router = require('./router/router');
const cors = require('cors');
// const bodyParser = require('body-parser');
require('./function/dbConnection')();
require('./multerUpload/multer')
app.use(express.json());
app.use(cors())
// app.use(bodyParser.json());
app.use('/data', express.static('uploads'))
// Note: check valid syntax come from frontend
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        
        console.error('JSON Syntax Error:');
        return res.status(400).json({ message: 'Invalid JSON format.' });
    }
    next(); 
});
app.use('/', router);

app.listen(port,(err)=>{
    if(err){
        console.log(err);
    } else {
        console.log(`listening on ${port}`)
    }
}); 