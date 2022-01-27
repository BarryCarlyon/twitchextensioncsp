const helmet = require('helmet');

twitchextensioncsp = Object.assign(
    function twitchextensioncsp(options) {
        let {
            clientID,

            enableRig,

            reportUri,

            imgSrc,
            mediaSrc,
            connectSrc
        } = options;

        if (!clientID) {
            throw new Error('TwitchExtensionCSP Missing Required ClientID in passed options');
        }

        enableRig = enableRig ? true : false;

        let contentSecurityPolicy = {
            directives: {
                defaultSrc: [
                    "'self'",
                    `https://${clientID}.ext-twitch.tv`
                ],
                connectSrc: [
                    "'self'",
                    `https://${clientID}.ext-twitch.tv`,
                    'https://api.twitch.tv',
                    'wss://pubsub-edge.twitch.tv',
                    'https://www.google-analytics.com',
                    'https://stats.g.doubleclick.net'
                ],
                fontSrc:    [
                    "'self'",
                    `https://${clientID}.ext-twitch.tv`,
                    'https://fonts.googleapis.com',
                    'https://fonts.gstatic.com'
                ],
                imgSrc:     [
                    "'self'",
                    `https://${clientID}.ext-twitch.tv`,
                    'http://static-cdn.jtvnw.net',
                    'https://www.google-analytics.com',
                    'data:',
                    'blob:'
                ],
                mediaSrc:   [
                    "'self'",
                    `https://${clientID}.ext-twitch.tv`,
                    'data:',
                    'blob:'
                ],
                scriptSrc:  [
                    "'self'",
                    `https://${clientID}.ext-twitch.tv`,
                    'https://extension-files.twitch.tv',
                    'https://www.google-analytics.com'
                ],
                styleSrc:   [
                    "'self'",
                    "'unsafe-inline'",
                    `https://${clientID}.ext-twitch.tv`,
                    'https://fonts.googleapis.com'
                ],

                frameAncestors: [
                    'https://supervisor.ext-twitch.tv',
                    'https://extension-files.twitch.tv',
                    'https://*.twitch.tv',
                    'https://*.twitch.tech',
                    'https://localhost.twitch.tv:*',
                    'https://localhost.twitch.tech:*',
                    'http://localhost.rig.twitch.tv:*'
                ]
            }
        }

        if (enableRig) {
            // the rig is an electron app
            // hence filesystem..
            contentSecurityPolicy.directives.frameAncestors = contentSecurityPolicy.directives.frameAncestors.concat(
                'http://localhost:*',
                'file://*',
                'filesystem:'
            );
        }

        if (reportUri) {
            contentSecurityPolicy.directives.reportUri = reportUri;
        }

        if (imgSrc && typeof imgSrc == 'object' && imgSrc.length > 0) {
            contentSecurityPolicy.directives.imgSrc = contentSecurityPolicy.directives.imgSrc.concat(imgSrc);
        }
        if (mediaSrc && typeof mediaSrc == 'object' && mediaSrc.length > 0) {
            contentSecurityPolicy.directives.mediaSrc = contentSecurityPolicy.directives.mediaSrc.concat(mediaSrc);
        }
        if (connectSrc && typeof connectSrc == 'object' && connectSrc.length > 0) {
            contentSecurityPolicy.directives.connectSrc = contentSecurityPolicy.directives.connectSrc.concat(connectSrc);
        }

        return helmet({
            contentSecurityPolicy,

            crossOriginEmbedderPolicy: false,
            crossOriginOpenerPolicy: false,
            crossOriginResourcePolicy: false,

            frameguard: false,
            xssFilter: false
        })
    }
);

module.exports = twitchextensioncsp;
