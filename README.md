# TwitchExtensionCSP

A simple module that provides middleware to Express, in order to add Twitch Extension Specific CSP Headers.

For Twitch Extension Development, you can provide a "local static" server to serve your Extension in a similar way to that of the Twitch CDN for Hosted Test/Released Extensions.

It uses [Helmet](https://github.com/helmetjs/helmet) under the hood.

## Quick Start

The minimum is to provide your Extension Client ID.

Create a `server.js`

```javascript
const express = require('express');
const app = express();

app.listen(8050, function () {
    console.log('booted express on 8050');
});

const twitchextensioncsp = require('twitchextensioncsp');
app.use(twitchextensioncsp({
    clientID: 'abcdefg123456'
}));

app.use('/extension/', express.static(__dirname + '/build/'));
```

This will provide, a Static Server, serving the content from `/build/` on the endpoint `/extension/` and uses `twitchextensioncsp` to define and add Content Security Policy headers.

## Options

The following options are available and can be passed to `twitchextensioncsp`

| Option | Required | Type | Default | Notes |
| ------ | -------- | ---- | ------- | ----- |
| clientID | Yes | String | Error Thrown | Your Extension Client ID, technically not needed for "testing" but makes your CSP more accurate to Hosted Test and above |
| enableRig | No | Boolean | `false` | If you are testing in the Twitch Extension Developer Rig, you will need to add additional items to the CSP for the Rig |
| imgSrc | No | Array of Strings | - | See Below |
| mediaSrc | No | Array of Strings | - | See Below |
| connectSrc | No | Array of Strings | - | See Below |

All of `imgSrc`, `mediaSrc`, `connectSrc` accept an array of Strings. Generally this will be domain names and/or full paths to match what is required for a valid content security policy.

These three items "mirror" the three fields in the Capabilities tab of a Version of an Extension.

You can read more about Content Security Policy over on [MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) and the various requirements for the fields.

*NOTE*: whilst you could define `connectSrc` as the schemasless/valud `test.example.com` but in some browsers this will not match `wss` as well as `https` so you are advised to specify the schema to be on the safe side. See example 3.

## Examples

- Example 1

See `test/test.js` or:

```javascript
const express = require('express');
const app = express();

app.listen(8050, function () {
    console.log('booted express on 8050');
});

const twitchextensioncsp = require('twitchextensioncsp');
app.use(twitchextensioncsp({
    clientID: '123123123',
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

app.use('/extension/', express.static(__dirname + '/build/'));
```

- Example 2

Load Twitch Profile images from Twitch, connect to a external custom API

```javascript
const express = require('express');
const app = express();

app.listen(8050, function () {
    console.log('booted express on 8050');
});

const twitchextensioncsp = require('twitchextensioncsp');
app.use(twitchextensioncsp({
    clientID: '123123123',
    imgSrc: [
        'static-cdn.jtvnw.net'
    ],
    connectSrc: [
        'https://api.example.com'
    ]
}));

app.use('/extension/', express.static(__dirname + '/build/'));
```

- Example 3

Load Twitch Profile images from Twitch, connect to the Twitch API, connect to an External API and Websocket

```javascript
const express = require('express');
const app = express();

app.listen(8050, function () {
    console.log('booted express on 8050');
});

const twitchextensioncsp = require('twitchextensioncsp');
app.use(twitchextensioncsp({
    clientID: '123123123',
    imgSrc: [
        'static-cdn.jtvnw.net'
    ],
    connectSrc: [
        'api.twitch.tv',
        'https://api.example.com',
        'wss://socket.example.com'
    ]
}));

app.use('/extension/', express.static(__dirname + '/build/'));
```
