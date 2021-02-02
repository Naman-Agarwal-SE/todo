var bodyParser =require('body-parser');
var mongoose = require('mongoose');

//connect to database
mongoose.connect('mongodb+srv://test:test@cluster0.26fqw.mongodb.net/todo?retryWrites=true&w=majority',{ useUnifiedTopology: true , useNewUrlParser: true }).then( () => {
    console.log('Connected to database ')
});

var todoschema = new mongoose.Schema({
    item:String
}); 

var datas = mongoose.model('todo',todoschema);

// var itemOne = datas({item : 'buy flowers'}).save(function(err){
//     if(err) throw err;
//     console.log('item saved');
// });

// var data = [{item : 'get milk'},{item:'walk dog'},{item :' kick some coding '}];
var urlencodedParser = bodyParser.urlencoded({extended: false});


module.exports=function(app){

    app.get('/todo',function(req,res){
        datas.find({},function(err,data){
           if(err)throw err;
           res.render('todo',{todos: data});
        });
    });
    app.post('/todo', urlencodedParser,function(req,res){
        console.log('hello');
        datas(req.body).save(function(err){
            if(err) throw err;
            console.log('item saved');
            datas.find({},function(err,data){
                if(err)throw err;
                res.render('todo',{todos: data});
            });
        });
    });
    app.get('/todo:item',function(req,res){
        console.log(req.params.item.replace(/:/g,''));
        datas.deleteOne({item:req.params.item.replace(/:/g,'')}).then(function(){ 
            datas.find({},function(err,data){
                if(err)throw err;
                res.render('todo',{todos: data});
            }); 
            console.log('deleted');
        }).catch(function(error){ 
            console.log(error);  
        }); 
        // datas.find({item:req.params.item.replace(/ /g,'-')}).remove(function(err,data){
        //     if(err) throw err;
        //     res.render('todo',{todos: data});
        // });
    });
    app.get('**',function(req,res){
        datas.find({},function(err,data){
           if(err)throw err;
           res.render('todo',{todos: data});
        });
    });
};