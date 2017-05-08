var express=require('express');

var routes=function(Book){
//var Book=require('../models/bookModel');

var bookRouter = express.Router();

var bookController=require('../Controllers/bookControllers')(Book);

//better way to handle all the 
bookRouter.route('/')
        .post(bookController.post)
        .get(bookController.get);

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
            var returnBook=req.book.toJSON();
            returnBook.links={};
            returnBook.links.SimilarGenre='http://'+req.headers.host+'/api/books/?genre='+req.book.genre
            
            res.json(returnBook);
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