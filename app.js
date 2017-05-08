var express=require('express');
var mongoose=require('mongoose');
var bodyParser=require('body-parser');

var db=mongoose.connect('mongodb://localhost/bookapi')

var Book=require('./models/bookModel');

var app=express();

var port=process.env.port || 3000;

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

bookRouter=require('./Routes/bookRoutes')(Book);

app.use('/api/books', bookRouter);
//app.use('/api/authors',authorRouter);

//Handler setup
app.get('/',function(req, res){
    res.send("welcome to API!!");
})


app.listen(port, function(){
    console.log('running on Port'+port);
})