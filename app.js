var express=require('express');
var mongoose=require('mongoose');

var db=mongoose.connect('mongodb://localhost/bookapi')

var Book=require('./models/bookModel');

var app=express();

var port=process.env.port || 3000;

var bookRouter = express.Router();
//better way to handle all the 
bookRouter.route('/books')
        .get(function(req,res){
            Book.find(function(err,books){
                if(err){
                    console.log(err);
                }
                else{
                    console.log('connected');
                    res.json(books);
                }
            })
            
            //var responseJson={Hello:'My api'};
            //res.json(responseJson);
        });

app.use('/api', bookRouter);


//Handler setup
app.get('/',function(req, res){
    res.send("welcome to API!!");
})


app.listen(port, function(){
    console.log('running on Port'+port);
})