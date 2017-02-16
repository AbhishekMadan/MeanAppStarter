/**
 * Created by abc on 15-Feb-17.
 */
var express    = require('express');
var app        = express();
var mongoose   = require('mongoose');
var todoTask   = require('./app/models/TodoTask');
var morgan     = require('morgan');
var bodyParser = require('body-parser');

const PORT = process.env.PORT || 8090;

app.use(morgan('dev'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

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

/**
 * Get all the todo tasks
 */
app.get('/api/todo',function (req,res) {
    todoTask.find({},function (err,tasks) {
        if(err) {
            res.send(err);
        }
        console.log(tasks);
        res.json(tasks);
    });

});

/**
 * Add a new todo task and return all todo tasks
 */
app.post('/api/todo',function (req,res) {
    todoTask.create({task:req.body.task},function(err){
        if(err) {
            res.send(err);
        }
        todoTask.find({},function(err,tasks) {
            console.log(tasks);
            res.send(tasks);
        });
    })
});

/**
 *  two ways to get parameter
 *  1. req.params.tagId           if param is passed as '/p/:tagId'
 *  2. req.query("tagId")         if passed is a query as /p?tagId=5
 */
app.delete('/api/todo/:task_desc',function (req,res) {
    todoTask.remove({task:req.params.task_desc},function (err) {
        if(err) {
            res.send(err);
        }
        todoTask.find({},function (err,tasks) {
            res.send(tasks);
        });
    })
});


app.listen(PORT,function () {
    console.log('Application Server started at :'+PORT);
});
