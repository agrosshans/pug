const express = require('express')
const path = require('path')
const app = express()
const port = 3000
const bodyParser = require('body-parser')

// Import the mongoose module
const mongoose = require("mongoose");


mongoose.connect(
    "mongodb://localhost:27017/nodekb?authSource=admin", {
        useNewUrlParser: true,
        user: process.env.user, // export user=root
        pass: process.env.pass, // export pass="pass123"
        keepAlive: true,
});
let db = mongoose.connection;


// check for db connection
db.on('error', function(){
    console.log(err);
});

db.once('open', function(){
    console.log('connected to MongoDB');
});

// Bring in models
let Article = require('./models/article.js')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// body-parser middleware parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// body-parser middleware parse application/json
app.use(bodyParser.json())

// set public folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
    Article.find({}, function(err, articles){
        if(err){
            console.log(err);
        } else
            res.render('index.pug', {
              title: "Articles",
              articles: articles,
        });
    });
});

// add route
app.get('/articles/add', function(req,res){
    res.render('add_articles.pug', {
        title: "Add Article",
    });
});

// add submit POST route
app.post('/articles/add', function(req,res){
    let article = new Article();
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

    article.save(function(err){
      if(err) {
        console.log(err);
        return;
      } else {
        res.redirect('/');
      }
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});