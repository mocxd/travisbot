require('./env.js');

var RtmClient = require('./node_modules/@slack/client/lib/clients/rtm/client');
var RTM_EVENTS = require('./node_modules/@slack/client/lib/clients/events/rtm').EVENTS;

var token = process.env.SLACK_API_TOKEN || '';

var RTM_CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS.RTM;

var rtm = new RtmClient(token, { logLevel: 'debug' });
rtm.start();

rtm.on(RTM_EVENTS.MESSAGE, function handleRtmMessage(message) {
  console.log("Message:", message);
  if (/[tT]ravis/g.test(message.text)) {
    var r = Math.floor(Math.random() * 4);
    if (r === 0) {
      rtm.sendMessage('hi', message.channel, function messageSent() {
        console.log('sent message');
      });
    } else if (r === 1) {
      rtm.sendMessage('sup', message.channel, function messageSent() {
        console.log('sent message');
      });
    } else if (r === 2) {
      rtm.sendMessage('オッス', message.channel, function messageSent() {
        console.log('sent message');
      });
    }  else if (r === 3) {
      rtm.sendMessage('yo', message.channel, function messageSent() {
        console.log('sent message');
      });
    }
  } else if (message.text.indexOf('<@U0S0MLG4W>') >= 0) {
    rtm.sendMessage('you could be testing right now <@' + message.user + '>', message.channel, function messageSent() {
      console.log('sent message');
    });
  }
});

rtm.on(RTM_EVENTS.REACTION_ADDED, function handleRtmReactionAdded(reaction) {
  console.log("Reaction added:", reaction);
});

rtm.on(RTM_EVENTS.REACTION_REMOVED, function handleRtmReactionRemoved(reaction) {
  console.log("Reaction removed:", reaction);
});


// you need to wait for the client to fully connect before you can send messages
rtm.on(RTM_CLIENT_EVENTS.RTM_CONNECTION_OPENED, function () {
  console.log('client connected');

});