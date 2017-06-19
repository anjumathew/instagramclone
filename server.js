//
// instagram clone assignment 2
//
// by Anju Mathew (7804396), Madhavi Patel(7780497)

var http = require('http');
var path = require('path');
var express = require('express');
var mongoose = require('mongoose');
var Post = require('./models/Post.js');


var router = express();
var server = http.createServer(router);

mongoose.connect('mongodb://user4396:password4396@ds064799.mlab.com:64799/databaseanju', function(err, db) {
  if (err) throw err;
  console.log('Connected to database;');
});


/*var post = new Post({
  image: 'http://www.zarias.com/wp-content/uploads/2015/12/10-cute-puppies.jpg',
  comment: 'cute puppy',
  likeCount: 0,
  feedbackCount: 0
});

post.save(function(err) {
  if (err) {
    console.log(err);
  }
  else {
    console.log('posted');
  }
});*/


router.use(express.static(path.resolve(__dirname, 'client')));

router.use(express.bodyParser());

router.get('/', function(req, res) {
  console.log('client requests posts.html');
  res.sendfile(path.join(__dirname, 'client/view', 'posts.html'));
});

router.post('/posts', function(req, res) {
  console.log('client requests posts list');
  Post.find({})
    .then(function(paths) {
      res.json(paths);
    });
});


server.listen(process.env.PORT || 3000, process.env.IP || '0.0.0.0', function() {
  var addr = server.address();
  console.log('Server listening at', addr.address + ':' + addr.port);
});
