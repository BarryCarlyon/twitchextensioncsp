const express = require('express');
const app = express();

app.listen(8052, function () {
    console.log('booted express on 8052');
});

const twitchextensioncsp = require(__dirname + '/../twitchextensioncsp.js');
app.use(twitchextensioncsp({
    clientID: 'bb5604h7y9b8b3bh6veoczaakanjzd',
    enableRig: true,
    imgSrc: [
        'https://images.example.com'
    ],
    mediaSrc: [
        'https://videos.example.com'
    ],
    connectSrc: [
        'https://api.example.com'
    ],
    reportUri: 'https://extensionsctrl.testing.barrycarlyon.co.uk/csp/'
}));

app.use((req,res,next) => {
    console.log('Loading', req.originalUrl);
    next();
});

app.post('/csp/', express.json({
    type: 'application/csp-report'
}), (req,res) => {
    res.send('Ok');

    if (req.body.hasOwnProperty('csp-report')) {
        console.error(
            "%s blocked by %s in %s",
            req.body['csp-report']['blocked-uri'],
            req.body['csp-report']['violated-directive'],
            req.body['csp-report']['source-file']
        );
        return;
    }
    console.log(req.body);
});

app.use('/', express.static(__dirname));
