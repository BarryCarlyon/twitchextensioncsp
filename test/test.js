const express = require('express');
const app = express();

app.listen(8050, function () {
    console.log('booted express on 8050');
});

const twitchextensioncsp = require(__dirname + '/../twitchextensioncsp.js');
app.use(twitchextensioncsp({
    client_id: '123123123',
    enableRig: true,
    imgSrc: [
        'https://images.example.com'
    ],
    mediaSrc: [
        'https://videos.example.com'
    ],
    connectSrc: [
        'https://api.example.com'
    ]
}));

app.use('/', express.static(__dirname));
