var express =require('express');
var todoController=require('./controller/todo-controller');

var Port = process.env.PORT || 3000;

var app = express();

app.set('view engine', 'ejs');

app.use(express.static('./public'));

todoController(app);

app.listen(Port);
console.log('you are listening to port 3000');

