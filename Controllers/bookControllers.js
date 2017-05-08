//var Book=require('../models/bookModel');
var bookController=function(Book){
    var post=function(req,res){
            console.log(req.body);
            var book=new Book(req.body);
            book.save();
            console.log(book);
            res.status(201).send(book);
        }
        var get=function(req,res){
            //var query=req.query;
            //http://localhost:8091/api/books/?genre=Fiction
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
                    var returnBooks=[];
                    books.forEach(function(element,index, array){
                        var newBook=element.toJSON();
                        newBook.links={};
                        newBook.links.self='http://'+req.headers.host+'/api/books/'+newBook._id;
                        returnBooks.push(newBook);
                    })
                    console.log('connected');
                    res.json(returnBooks);
                }
            })
            
            //var responseJson={Hello:'My api'};
            //res.json(responseJson);
        }
        return {
            post:post,
            get:get
        }
}

module.exports=bookController;
