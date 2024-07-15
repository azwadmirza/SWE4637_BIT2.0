const mongoose = require('mongoose');
require('dotenv').config();
module.exports = () => {
    try{
        mongoose.connect(process.env._HOST);
        console.log('Connected to database')
    }
    catch(error){
        console.log(error);
        console.log('Error connecting to database');
    }   
}