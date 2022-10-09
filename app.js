const express = require('express')
const path = require('path')
const app = express()
const port = 3000

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', function(req, res){
    let articles = [
        {
            id:1,
            title:"item1",
            author:"adsf",
            "body":"this is item1"
        },
        {
            id:2,
            title:"item2",
            author:"qwer",
            "body":"this is item2"
        },
        {
            id:1,
            title:"item3",
            author:"yxcv",
            "body":"this is item3"
        },
    ]
  res.render('index.pug', {
    title: "Articles",
    articles: articles,
  })
});

// add route
app.get('/articles/add', function(req,res){
    res.render('add_articles.pug', {
        title: "Add Article",
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});