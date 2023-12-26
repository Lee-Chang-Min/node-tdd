const express = require('express');

const productRoutes = require('./routes');
const PORT = 5000;
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://cmlee:cmlee@tdd.pfjjyya.mongodb.net/')
    .then(() => console.log("connected"))
    .catch(() => console.log("mongodb connection failed"));  

app.use(express.json());

app.use('/api/products', productRoutes);
app.get('/', (req, res) => {
    res.send('hello world');
});

app.use(function(error, req, res, next){
  res.status(500).json({message: error.message})  
});

app.listen(PORT);
console.log(`Running on port ${PORT}`);


module.exports = app;


