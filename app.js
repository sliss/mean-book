
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , town_list = require('./routes/town_list')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var CryptoJS    = require("crypto-js");
var crypto 		= require("crypto");
var SHA512      = require("crypto-js/sha512");

var flash = require('connect-flash');

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

var app = express();

var Mongoose = require('mongoose');
var db = Mongoose.createConnection('localhost', 'mytestapp');
// mongo schemas
var UserSchema = require('./models/Todo.js').UserSchema;
var TodoSchema = require('./models/Todo.js').TodoSchema;
var TownSchema = require('./models/Todo.js').TownSchema;
var CommentSchema = require('./models/Todo.js').CommentSchema;
var Users = db.model('users', UserSchema);
var Todo = db.model('todos', TodoSchema);
var Town = db.model('towns', TownSchema);
var Comment = db.model('comments', CommentSchema);


// for authentication
passport.use(new LocalStrategy(function(username, password, done){
	var self = this;
	console.log('passport authenticating username: ',username, 'password:', password);
	//console.log('sha512(token+state3144)', CryptoJS.enc.Hex.stringify(SHA512('bb3172da0f301b5df755d53eece48e2d9d386a83f7e4bac8f25289c37f948fd5ed18cf40b4ce4b364e3d4757bb9cef433351c170cdb3756936a951a4e413b13e1cedf2259ef0e95db31d849fbc092b0108b2b30b93df50caf080814cc0194a7bc17ae109624e2428085e0626fa93b0f3c201916271effe62aea22d0338815900d3c5bf9911970a3b39a4336d1aaf39f4ea0b3af6a861a68644dd38ed0db0011a2166fcf8d77ca0cda9e1022fcad3c47a93b511e2c74e79ca6bdf0bea636bdb92ba29c0c262c60e361db2ca7c8cdb67cbf44e36d659c7be759e50a6509c70a68caa972ff0c9ea095115ecf4ce12231375c390fd539244f95158de0e152d8714a6state3144')));
	//console.log('random token', crypto.randomBytes(256).toString('hex'));


    Users.findOne({ username : username},function(err,user){
        if(err) { //server error
        	console.log('server error?');
        	return done(err); 
        }
        if(!user){
        	console.log('user not found');
            return done(null, false, { message: 'Incorrect username.' });
        }

        clientHash = CryptoJS.enc.Hex.stringify(SHA512(user.salt + password));
        userHash = user.hash;
        console.log('clienthash:', clientHash);
        console.log('userhash:', userHash);
        //( password, user.salt, function (err, hash) {
            /*if (err) { 
	        	console.log('hashing error:', err);
            	return done(err); 
            }*/

        if (clientHash == userHash){
        	console.log('login successful');
        	return done(null, user);
        } 
        else {
        	console.log('incorrect password');
        	done(null, false, { message: 'Incorrect password.' });
        }
        //});
    });
}));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});


passport.deserializeUser(function(id, done) {
    Users.findById(id, function(err,user){
        if(err) done(err);
        done(null,user);
    });
});


// all environments
app.set('port', process.env.PORT || 80);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.cookieParser());
app.use(express.session({ secret: 'redNovember4028' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(flash());
//app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//login & logout
app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/welcome.html',
                                   failureFlash: true })
);

app.get('/logout', function(req, res){
		req.logout();
		res.render('welcome');
});

//load towns from DB
app.get('/towns.json', routes.get(Town));


//app.put('/todo/:id.json', routes.update(Todo));
app.put('/town/:id.json', routes.update(Town));

app.post('/addComment', routes.addComment(Comment));
app.post('/load_data', routes.loadData(Town));
app.get('/', routes.index(Todo));
app.post('/getComment', routes.getComment(Comment));


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
