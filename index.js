require('dotenv').config();
const port = process.env.PORT || 3001;
const express = require('express');
const app = express();  
const router = require('./router/router');

app.use(express.json());
app.use('/', router);

app.listen(port,(err)=>{
    if(err){
        console.log(err);
    } else {
        console.log(`listening on ${port}`)
    }
}); 