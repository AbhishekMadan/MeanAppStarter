/**
 * Created by abc on 15-Feb-17.
 */
var mongoose =  require('mongoose');

var Schema = mongoose.Schema;

/**
 * Either specify the collection name in the Schema or
 * define the model as: mongoose.model('todoTask',taskSchema,'todoTask')
 *
 * If we dont follow any of this then the model that Mongoose searches for
 * is the plural name of the collection specified ie. 'todoTasks'
 */

var taskSchema = new Schema({
    no : {type:Number},
    task : {type:String}
},{collection:'todoTask'});

module.exports = mongoose.model('todoTask',taskSchema);