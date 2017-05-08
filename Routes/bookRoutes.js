var express=require('express');

var routes=function(Book){
//var Book=require('../models/bookModel');

var bookRouter = express.Router();
//better way to handle all the 
bookRouter.route('/')
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

bookRouter.route('/:bookId')
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

return bookRouter;
};

module.exports=routes;