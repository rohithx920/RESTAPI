var express=require('express');
var mongoose=require('mongoose');
var bodyParser=require('body-parser');

var db=mongoose.connect('mongodb://localhost/bookapi')

var Book=require('./models/bookModel');

var app=express();

var port=process.env.port || 3000;

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

var bookRouter = express.Router();
//better way to handle all the 
bookRouter.route('/books')
        .post(function(req,res){
            console.log(req.body);
            var book=new Book(req.body);
            book.save();
            console.log(book);
            res.status(201).send(book);
        })
        .get(function(req,res){
            //var query=req.query;
            var query={};
            if(req.query.genre){
                query.genre=req.query.genre;
            }
            Book.find(query,function(err,books){
                if(err){
                    res.status(500).send(err);
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

//For single id

bookRouter.route('/books:bookId')
        .get(function(req,res){
            //var query=req.query;
            var query={};
            if(req.query.genre){
                query.genre=req.query.genre;
            }
            Book.findById(req.params.bookId,function(err,book){
                if(err){
                    res.status(500).send(err);
                    console.log(err);
                }
                else{
                    console.log('connected');
                    res.json(book);
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