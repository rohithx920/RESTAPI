var should=require('should'),
    sinon=require('sinon');

describe('Book Controller Tests:', function(){
    describe('post', function(){
        it('should not allow empty title', function(){
            var Book=function(book){this.save=function(){}};
            var req={
                body:{
                    author:'roh'
                }
            }
            var res={
                status:sinon.spy(),
                send:sinon.spy()
            }

            res.status.calledWith(400).should.equal(true,'Bad Status'+res.status);
            res.send.calledWith('Title is required').should.equal(true);
        })
    })
});