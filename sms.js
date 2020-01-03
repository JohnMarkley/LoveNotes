//Load env variables
require('dotenv').config();
const CronJob = require('cron').CronJob;


const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;
const gfsNumber = process.env.GFSNUMBER;
const fromNumber = process.env.FROMNUMBER;


const client = require('twilio')(accountSid, authToken);

const cutePhrases = ['I miss you babe!', 'I love you!', 'I want you to know that you have the most beautiful eyes and the most wonderful heart',
                        'you make my heart smile in a very special way', 'When I look in your eyes I see myself being with you forever', 'I wrote a bot that will send random messages to you',
                        "it isn't working out, I'm sorry"];

let message = 0;
let messageCount = 0;

const job = new CronJob('10 * * * * *', function() {
    message = cutePhrases[Math.floor(Math.random() * cutePhrases.length)];
    console.log(messageCount++);
    sendMessage();
});

function sendMessage(){
    console.log('Sending message');
    client.messages.create({
        body: message,
        from: fromNumber,
        to: gfsNumber
    }). then(message => console.log(message.status));
}

job.start();




