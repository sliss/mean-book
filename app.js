
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , town_list = require('./routes/town_list')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

var Mongoose = require('mongoose');
var db = Mongoose.createConnection('localhost', 'mytestapp');
// mongo schemas
var TodoSchema = require('./models/Todo.js').TodoSchema;
var TownSchema = require('./models/Todo.js').TownSchema;
var Todo = db.model('todos', TodoSchema);
var Town = db.model('towns', TownSchema);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
//app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


app.get('/town_list', routes.town_list(Town));

app.get('/users', user.list);
app.get('/towns.json', routes.get(Town));


//app.put('/todo/:id.json', routes.update(Todo));
app.put('/town/:id.json', routes.update(Town));

app.post('/todo.json', routes.addTodo(Todo));
app.post('/town.json', routes.addTown(Town));
app.post('/load_data', routes.loadData(Town));
app.get('/', routes.index(Todo));

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
