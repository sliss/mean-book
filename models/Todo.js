var Mongoose = require('mongoose');

exports.UserSchema = new Mongoose.Schema({
  username: String,
  salt: String,
  hash: String
});

exports.TodoSchema = new Mongoose.Schema({
  description : { type : String, required : true },
  due : { type : Date, required : true },
  done : { type : Boolean, default : false }
});

exports.CommentSchema = new Mongoose.Schema({
  townSlug : { type : String, required : true },
  commentText : { type : String, required : true },
  timestamp : { type : String, required : true }
});

var RegisteredPercentagesSchema = new Mongoose.Schema({
  democrat : { type : Number, required : false},
  green_rainbow : { type : Number, required : false},
  republican : { type : Number, required : false},
  unenrolled : { type : Number, required : false}
});

var RegisteredVotersSchema = new Mongoose.Schema({
  democrat : { type : Number, required : false},
  green_rainbow : { type : Number, required : false},
  republican : { type : Number, required : false},
  unenrolled : { type : Number, required : false}
});

var VotePercentagesSchema = new Mongoose.Schema({
  democrat : { type : Number, required : false},
  green_rainbow : { type : Number, required : false},
  republican : { type : Number, required : false},
  unenrolled : { type : Number, required : false}
});

var VotesSchema = new Mongoose.Schema({
  democrat : { type : Number, required : false},
  green_rainbow : { type : Number, required : false},
  republican : { type : Number, required : false},
  unenrolled : { type : Number, required : false},
});
exports.TownSchema = new Mongoose.Schema({
  name : { type : String, required : true },
  county : { type : String, required : false },
});
/*
exports.TownSchema = new Mongoose.Schema({
  name : { type : String, required : true },
  county : { type : String, required : false },
  delta_local_aid : { type : Number, required : false },
  delta_local_aid_per_capita : { type : Number, required : false },
  delta_local_aid_percentage : { type : Number, required : false },
  established : { type : Number, required : false },
  gov_type : { type : String, required : false },
  image_link : { type : String, required : false },
  local_aid_2008 : { type : Number, required : false },
  local_aid_2013 : { type : Number, required : false },
  percent_registered_republicans : { type : Number, required : false },
  percent_registered_unenrolled : { type : Number, required : false },
  population : { type : Number, required : true },
  registered_percentages : [RegisteredPercentagesSchema],
  registered_voters : [RegisteredVotersSchema],
  slug : { type : Number, required : true },
  unemployment_difference_from_MA_average : { type : Number, required : false },
  unemployment_percentage : { type : Number, required : false },
  unemployment_total : { type : Number, required : false },
  vote_percentages : [VotePercentagesSchema],
  votes : [VotesSchema]
});
*/