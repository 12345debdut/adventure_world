const express = require('express');
const exphbs = require('express-handlebars');
const mongoose=require('mongoose')
const path = require('path');
const session=require('express-session')
const indexRouter = require('./routes/index');
const authRouter=require('./routes/auth')
const MONGODB_ATLAS_URL = "mongodb+srv://rimadas1234:Rimadas1234@cluster0.0m2g4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
require('dotenv').config()
// const mongoose = require('./dbconnect');

const app = express();
//mongodb server connection
mongoose.connect(MONGODB_ATLAS_URL,{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
    if(err)
    {
        console.log("mongo error occured")
    }else{
        console.log("mongodb server is connected")
    }
})
app.engine('.hbs',exphbs({defaultLayout: 'layout', extname: '.hbs',helpers:{
    ifcond:function(v1,v2,options){
        if(v1 && !v2)
        {
            return options.fn(this)
        }else{
            return options.inverse(this)
        }
    }
}}))
app.set('view engine','.hbs');

var bodyParser = require("body-parser");
app.use('/uploads',express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(session({
    secret:"session secret",
    resave:false,
    saveUninitialized:true,
    cookie:{maxAge:60*60*60*60}
}))


app.use('/',express.static(path.join(__dirname, 'public')));
app.use('/auth',express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/auth',authRouter)

app.listen(process.env.PORT || 4000, () =>
{
    console.log('Express Server is running at port no 4000');
});

module.exports = app;