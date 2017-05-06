var express=require('express');
var moongose=require('mongoose');

var app=express();

var port=process.env.port || 3000;

var bookRouter = express.Router();
//better way to handle all the 
bookRouter.route('/books')
        .get(function(req,res){
            var responseJson={Hello:'My api'};
            res.json(responseJson);
        });

app.use('/api', bookRouter);


//Handler setup
app.get('/',function(req, res){
    res.send("welcome to API!!");
})


app.listen(port, function(){
    console.log('running on Port'+port);
})