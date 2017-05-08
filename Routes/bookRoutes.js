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
bookRouter.use('/:bookId',function(req,res,next){
    Book.findById(req.params.bookId,function(err,book){
                if(err){
                    res.status(500).send(err);
                    console.log(err);
                }
                else if(book){
                    console.log('connected Book exists');
                    req.book=book;
                    next();
                    //res.json(book);
                }
                else{
                    res.status(404).send('no book found');
                }
            })
})
bookRouter.route('/:bookId')
        .get(function(req,res){
            console.log('we are in get');
            res.json(req.book);
        })
        .put(function(req,res){
               
                    console.log('connected');
                    req.book.title=req.body.title;
                    req.book.author=req.body.author;
                    req.book.genre=req.body.genre;
                    req.book.read=req.body.read;
                    req.book.save(function(err){
                    if(err)
                    res.status(500).send(err);
                    else{
                        res.json(req.book);
                    }
                });
                    
                
            })
            .patch(function(req,res){
                console.log('patch going on');
                if(req.body._id)
                    delete req.body._id
                //for every key in req.body
                for(var p in req.body){
                    req.book[p]=req.body[p];
                }
                req.book.save(function(err){
                    if(err)
                    res.status(500).send(err);
                    else{
                        console.log('patch updating');
                        res.json(req.book);
                    }
                });
            })
            .delete(function(req,res){
                req.book.remove(function(err){
                    if(err)
                    res.status(500).send(err);
                    else{
                        console.log('patch updating');
                        res.status(204).send('book deleted');
                    }
                })
            });

return bookRouter;
};

module.exports=routes;