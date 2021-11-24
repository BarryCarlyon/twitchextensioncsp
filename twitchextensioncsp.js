const helmet = require('helmet');

twitchextensioncsp = Object.assign(
    function twitchextensioncsp(options) {
        let {
            client_id,
            enableRig,
            reportUri,

            imgSrc,
            mediaSrc,
            connectSrc
        } = options;

        if (!client_id) {
            throw new Error('TwitchExtensionCSP Missing ClientID in options');
        }
        enableRig = enableRig ? true : false;

        let contentSecurityPolicy = {
            directives: {
                defaultSrc: [
                    "'self'",
                    `https://${client_id}.ext-twitch.tv`
                ],
                connectSrc: [
                    "'self'",
                    `https://${client_id}.ext-twitch.tv`,
                    'https://extension-files.twitch.tv',
                    'https://www.google-analytics.com',
                    'https://stats.g.doubleclick.net'
                ],
                fontSrc:    [
                    "'self'",
                    `https://${client_id}.ext-twitch.tv`,
                    'https://fonts.googleapis.com',
                    'https://fonts.gstatic.com'
                ],
                imgSrc:     [
                    "'self'",
                    'data:',
                    'blob:'
                ],
                mediaSrc:   [
                    "'self'",
                    'data:',
                    'blob:'
                ],
                scriptSrc:  [
                    "'self'",
                    `https://${client_id}.ext-twitch.tv`,
                    'https://extension-files.twitch.tv',
                    'https://www.google-analytics.com',
                    'https://stats.g.doubleclick.net'
                ],
                styleSrc:   [
                    "'self'",
                    "'unsafe-inline'",
                    `https://${client_id}.ext-twitch.tv`,
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
            contentSecurityPolicy.directives.connectSrc.concat(
                'wss://pubsub-edge.twitch.tv'
            );
            contentSecurityPolicy.directives.frameAncestors.concat(
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
            contentSecurityPolicy
        })
    }
);

module.exports = twitchextensioncsp;
