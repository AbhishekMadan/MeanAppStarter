/**
 * Created by abc on 15-Feb-17.
 */
var express    = require('express');
var app        = express();
var mongoose   = require('mongoose');
var todoTask   = require('./app/models/TodoTask');
var morgan     = require('morgan');

const PORT = process.env.PORT || 8090;
app.use(morgan('dev'));

mongoose.connect('mongodb://localhost:27017/school',function (err) {
    if(err) {
        console.log('Cannot connect to DB.');
    } else {
        console.log('Connection to DB establish.')
    }
});

app.get('/',function (req,res) {
    res.send('Hello World!');
});

app.get('/todo',function (req,res) {
    todoTask.find({},function (err,tasks) {
        console.log(tasks);
    });
    res.send('done');
});

app.listen(PORT,function () {
    console.log('Application Server started at :'+PORT);
});
