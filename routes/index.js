
/*
 * GET home page.
 */
var request     = require('request');

exports.index = function(Todo) {
  return function(req, res) {
    console.log("routes -> index.js -> index");
    Todo.find({}, function(error, todos) {
      res.render('index', {
        title: 'Express',
        todos : todos
      });
    });
  };
};

// get data from mongo.  called from controller.

exports.get = function(Town) {
  return function(req, res) {
    console.log("route index: finding the towns in mongo");
    Town.find({}, function(error, towns) {
      console.log("get towns resp (#):",towns.length);
      //res.send, but explicitely for JSON
      res.json({ towns : towns });
    });
  }
};

/*exports.get = function(Todo) {
  return function(req, res) {
    console.log("finding the todos in mongo");
    Todo.find({}, function(error, todos) {
      res.json({ todos : todos });
    });
  }
};*/

exports.update = function(Town) {
  return function(req, res) {
    Town.findOne({ _id : req.params.id }, function(error, todo) {
      if (error || !town) {
        res.json({ error : error });
      } else {
        town.done = req.body.done;
        town.save(function(error, town) { //collection saves - writes to database
          if (error || !town) {
            res.json({ error : error });
          } else {
            res.json({ town : town });
          }
        });
      }
    });
  }
};

/*
exports.update = function(Todo) {
  return function(req, res) {
    Todo.findOne({ _id : req.params.id }, function(error, todo) {
      if (error || !todo) {
        res.json({ error : error });
      } else {
        todo.done = req.body.done;
        todo.save(function(error, todo) { //collection saves - writes to database
          if (error || !todo) {
            res.json({ error : error });
          } else {
            res.json({ todo : todo });
          }
        });
      }
    });
  }
};
*/

exports.addTodo = function(Todo) {
  return function(req, res) {
    var todo = new Todo(req.body); //req.body is the JSON object, e.g. req.body.description give the description
    //console.log("description:" + req.body.description);
    //console.log(Todo.find({description: "11"}).limit(1));
    /*if(Todo.findOne({description: "11"})) {
      console.log("found dupe!!");
    } */ 
    Todo.find({description: {$in: ["11","12"]}},function(error,docs){
      if (error || !docs) {
        console.log("error :(");
        console.log("errouneous doc: " + doc);
        res.json({ error : error });
      } else {
        docs.forEach(function(d){
          console.log(d);
        });
        
        res.json({ todo : todo });
      }
    }); // {description: {$in: "11"}}

    /**** this works ****
    var myDoc;
    Todo.findOne({description: {$in: ["11","12"]}},function(error,doc){
      if (error || !doc) {
        console.log("error :(");
        console.log("errouneous doc: " + doc);
        res.json({ error : error });
      } else {
        console.log("myDoc: " + doc);
        myDoc = doc;
        console.log("near end addTodo: " + myDoc);
        res.json({ todo : doc });
      }
    }); 
    */
    
    /*Todo.update({'description': '11'}, todo, {upsert : true}, function(error, todo) {
      console.log("upserting");
      if (error || !todo) {
        res.json({ error : error });
      } else {
        res.json({ todo : todo });
      }
    });*/
    todo.save(function(error, todo) {
      if (error || !todo) {
        res.json({ error : error });
      } else {
        res.json({ todo : todo });
      }
    });
    //console.log(JSON.stringify(todo));
  };
};

exports.addTown = function(Town) {
  return function(req, res) {
    var town = new Town(req.body); //req.body is the JSON object, e.g. req.body.description give the description

    town.save(function(error, town) {
      if (error || !town) {
        res.json({ error : error });
      } else {
        res.json({ town : town });
      }
    });
    console.log(JSON.stringify(town));
  };
};


exports.addComment = function(Comment) {
  return function(req, res) {
    console.log('index.js/addComment');
    var commentBody = {
      townSlug: req.body.townSlug,
      commentText: req.body.commentText.replace(/^[\r\n]+|[\r\n]+$/g, "").replace('\n',''),
      timestamp: new Date().toISOString()
    };

    /*
    if(req.body._id){ //comment already exists, so overwrite
      //commentBody._id = req.body._id;
      console.log('update: replace.');
    }*/

    //var queryValue = req.body.query_value;


    var comment = new Comment(commentBody);
    Comment.update({townSlug: req.body.townSlug},commentBody, {upsert:true},function(error, comment) {
      if (error || !comment) {
        res.json({ error : error });
      } else {
        res.json(comment);
      }
    });
    console.log(JSON.stringify(comment));
  };
};

exports.getComment = function(Model) {
  return function(req, res) {
    console.log("route index: finding the docs in mongo");
    var queryAttribute = req.body.query_attribute;
    var queryValue = req.body.query_value;

    Model.findOne({townSlug: queryValue}, function(error, docs) {
      console.log("get docs resp:",docs);
      //res.send, but explicitely for JSON
      res.json(docs);
    });
  }
};

exports.loadData = function(Town) {
  return function(req, res) {
    console.log("load ye data!");
    //var todo = new Todo(req.body);
    console.log(JSON.stringify(todo));
    
    //town_filenames = ["abington.json","halifax.json","phillipston.json","acton.json","hamilton.json","pittsfield.json","acushnet.json","hampden.json","plainfield.json","adams.json","hancock.json","plainville.json","agawam.json","hanover.json","plymouth.json","alford.json","hanson.json","plympton.json","amesbury.json","hardwick.json","princeton.json","amherst.json","harvard.json","provincetown.json","andover.json","harwich.json","quincy.json","aquinnah.json","hatfield.json","randolph.json","arlington.json","haverhill.json","raynham.json","ashburnham.json","hawley.json","reading.json","ashby.json","heath.json","rehoboth.json","ashfield.json","hingham.json","revere.json","ashland.json","hinsdale.json","richmond.json","athol.json","holbrook.json","rochester.json","attleboro.json","holden.json","rockland.json","auburn.json","holland.json","rockport.json","avon.json","holliston.json","rowe.json","ayer.json","holyoke.json","rowley.json","barnstable.json","hopedale.json","royalston.json","barre.json","hopkinton.json","russell.json","becket.json","hubbardston.json","rutland.json","bedford.json","hudson.json","salem.json","belchertown.json","hull.json","salisbury.json","bellingham.json","huntington.json","sandisfield.json","belmont.json","ipswich.json","sandwich.json","berkley.json","kingston.json","saugus.json","berlin.json","lakeville.json","savoy.json","bernardston.json","lancaster.json","scituate.json","beverly.json","lanesborough.json","seekonk.json","billerica.json","lawrence.json","sharon.json","blackstone.json","lee.json","sheffield.json","blandford.json","leicester.json","shelburne.json","bolton.json","lenox.json","sherborn.json","boston.json","leominster.json","shirley.json","bourne.json","leverett.json","shrewsbury.json","boxborough.json","lexington.json","shutesbury.json","boxford.json","leyden.json","somerset.json","boylston.json","lincoln.json","somerville.json","braintree.json","littleton.json","south_hadley.json","brewster.json","longmeadow.json","southampton.json","bridgewater.json","lowell.json","southborough.json","brimfield.json","ludlow.json","southbridge.json","brockton.json","lunenburg.json","southwick.json","brookfield.json","lynn.json","spencer.json","brookline.json","lynnfield.json","springfield.json","buckland.json","malden.json","sterling.json","burlington.json","manchester.json","stockbridge.json","cambridge.json","mansfield.json","stoneham.json","canton.json","marblehead.json","stoughton.json","carlisle.json","marion.json","stow.json","carver.json","marlborough.json","sturbridge.json","charlemont.json","marshfield.json","sudbury.json","charlton.json","mashpee.json","sunderland.json","chatham.json","mattapoisett.json","sutton.json","chelmsford.json","maynard.json","swampscott.json","chelsea.json","medfield.json","swansea.json","cheshire.json","medford.json","taunton.json","chester.json","medway.json","templeton.json","chesterfield.json","melrose.json","tewksbury.json","chicopee.json","mendon.json","tisbury.json","chilmark.json","merrimac.json","tolland.json","clarksburg.json","methuen.json","topsfield.json","clinton.json","middleborough.json","townsend.json","cohasset.json","middlefield.json","truro.json","colrain.json","middleton.json","tyngsborough.json","concord.json","milford.json","tyringham.json","conway.json","millbury.json","upton.json","cummington.json","millis.json","uxbridge.json","dalton.json","millville.json","wakefield.json","danvers.json","milton.json","wales.json","dartmouth.json","monroe.json","walpole.json","dedham.json","monson.json","waltham.json","deerfield.json","montague.json","ware.json","dennis.json","monterey.json","wareham.json","dighton.json","montgomery.json","warren.json","douglas.json","mount_washington.json","warwick.json","dover.json","nahant.json","washington.json","dracut.json","nantucket.json","watertown.json","dudley.json","natick.json","wayland.json","dunstable.json","needham.json","webster.json","duxbury.json","new_ashford.json","wellesley.json","east_bridgewater.json","new_bedford.json","wellfleet.json","east_brookfield.json","new_braintree.json","wendell.json","east_longmeadow.json","new_marlborough.json","wenham.json","eastham.json","new_salem.json","west_boylston.json","easthampton.json","newbury.json","west_bridgewater.json","easton.json","newburyport.json","west_brookfield.json","edgartown.json","newton.json","west_newbury.json","egremont.json","norfolk.json","west_springfield.json","erving.json","north_adams.json","west_stockbridge.json","essex.json","north_andover.json","west_tisbury.json","everett.json","north_attleborough.json","westborough.json","fairhaven.json","north_brookfield.json","westfield.json","fall_river.json","north_reading.json","westford.json","falmouth.json","northampton.json","westhampton.json","fitchburg.json","northborough.json","westminster.json","florida.json","northbridge.json","weston.json","foxborough.json","northfield.json","westport.json","framingham.json","norton.json","westwood.json","franklin.json","norwell.json","weymouth.json","freetown.json","norwood.json","whately.json","gardner.json","oak_bluffs.json","whitman.json","georgetown.json","oakham.json","wilbraham.json","gill.json","orange.json","williamsburg.json","gloucester.json","orleans.json","williamstown.json","goshen.json","otis.json","wilmington.json","gosnold.json","oxford.json","winchendon.json","grafton.json","palmer.json","winchester.json","granby.json","paxton.json","windsor.json","granville.json","peabody.json","winthrop.json","great_barrington.json","pelham.json","woburn.json","greenfield.json","pembroke.json","worcester.json","groton.json","pepperell.json","worthington.json","groveland.json","peru.json","wrentham.json"];

    town_filenames = ["abington.json","acton.json","adams.json"];

    for(t in town_filenames) {



    var url = './towns/' + t;
    request.get({
        url:url
      }, function(error, response, body){
        if (error) { 
          console.log(error); cb(null);
        }
        else {
          var town = JSON.parse(body);
          console.log("the body", body);
           todo.save(function(error, town) {
            if (error || !town) {
              res.json({ error : error });
            } else {
              res.json({ town : town });
            }
          });
        }
      });

    }
  };
};