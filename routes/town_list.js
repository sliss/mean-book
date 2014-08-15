
/*
 * GET home page.
 */
/*
exports.town_list = function(req, res) {
   res.render('town_list', { title: 'Hello, World!' });
};
*/
var request     = require('request');

exports.town_list = function(Town) {
  return function(req, res) {
  	console.log("route: townlist.js townlist -> townlist");
    Town.find({}, function(error, towns) {
      res.render('town_list', {
        title: 'It is the town list, actually!',
        towns : towns
      });
    });
  };
};
/*
// get data from mongo
exports.get = function(Town) {
  return function(req, res) {
    console.log("finding the towns in mongo");
    Town.find({}, function(error, towns) {
      console.log("get res:",towns);
      res.json({ towns : towns });
    });
  }
};
*/