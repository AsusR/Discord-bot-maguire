const firstMessage = require('./first-message')
module.exports = client => {
    const channelId = '790542617912803329';

    firstMessage(client, channelId, 'hello world', []);
}