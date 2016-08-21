var request = require('request');

function getReplyBasedOnMessage(message){
  //At this point, you work some logical magic here
  //It could be a series of if-else statements, or something more intricate
  //For now, we'll just reply with something simple:

  return "Hey, I think it's cool that you said '" + message + "'"
}

function sendTextMessage(recipientId, messageText) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: messageText
    }
  };

  callSendAPI(messageData);
}

function callSendAPI(messageData) {
  request({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: 'EAAQpdUecsVYBAK89xCt9PTn09AJe2KAZAphSPuAab3gCBwEsxWf0euGj4ZCWl8w7B84b595N8Eb0G5ZAQ0GuVvCYmauoBOEv5GkKzU92kDA61pK86QIH3sX9sfAqOOtmzCMnAOuxQacDHozPahRbJZAUmmVv1phYdfCfziWueAZDZD' },
    method: 'POST',
    json: messageData

  }, function (error, response, body) {
    if (!error && response.statusCode == 200) { console.log("Successfully sent message");
    } else {console.error("Unable to send message.");console.error(response);console.error(error);}
  });  
}


var chatFcn = {
  getReplyBasedOnMessage: getReplyBasedOnMessage,
  sendTextMessage: sendTextMessage,
  callSendAPI: callSendAPI
}

module.exports = chatFcn;



