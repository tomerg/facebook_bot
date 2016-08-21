var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request')

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.static('node_modules'));

var chat = require('./public/main.js');

app.get('/webhook', function (req, res) {
  if (req.query['hub.verify_token'] === 'my_verify_token_here'){
    res.send(req.query['hub.challenge']);
  }
  else{res.send('Wrong token bud')}
});

app.post('/webhook', function (req, res) {
  var data = req.body.entry[0].messaging[0];
  var message = data.message
  var senderID = data.sender.id
  
  if(message){
    message = message.text
    var reply = chat.getReplyBasedOnMessage(message)
    
    chat.sendTextMessage(senderID, reply)
  }
  else{ console.log("Something derped") }

  res.sendStatus(200);  //required to send FB some response, else all fails.
})

app.listen(1200)