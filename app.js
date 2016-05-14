var express = require('express')
    ,app = express()
    ,router = express.Router()
    ,http = require('http')
    ,db = require('./app/model/db')
    ,logger = require('./app/helpers/logger')
    ,bodyParser = require('body-parser')
    ,port = process.env.PORT || 3002;


app.set('views', __dirname + 'app/views')
app.engine('jade', require('jade').__express)
app.set('view engine', 'jade')
app.set('superSecret','#r4dew@#E#@cfdsfffwe342432CDSEWF#2fd@@@#E');
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//middleware to load controllers
app.use(require('./app/controllers'))

//created a server
db.connect(function(){
  //callback when connect success
  http.createServer(app).listen(port);
});

db.get().connection.on('connected',function(){
  logger.info('Mongoose connected '+app.port);
});

process.on('SIGINT',function(){
  db.get().connection.close(function(){
    logger.info('Mongoose connection is disconnected..');
    process.exit(0);
  });
});






