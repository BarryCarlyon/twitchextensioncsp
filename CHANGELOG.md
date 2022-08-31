# Change Log

## V1.2.0 - 2022-09-01

- Updated dependencies for helmet to v6
- Tweaked the rules to match Twitch

## V.1.1.3 - Unreleased

- Updated dependencies (helmet/express)
- Added `block-all-mixed-content` inline with latest default src on Twitch
- @todo check/debug just in case before NPM pushing

## V.1.1.2 - 2022-01-27

- We will not speak of this mistake...

## V.1.1.1 - 2022-01-28

- The Apocalypse happened and Twitch decided to add `http://static-cdn.jtvnw.net` to the Default `img-src`
- Updated helmet to 5.0.2

## V.1.1.0 - 2022-01-21

- Updated the Base CSP to match what [Twitch reports](https://discuss.dev.twitch.tv/t/new-extensions-policy-for-content-security-policy-csp-directives-and-timeline-for-enforcement/33695/8) that it will be using
- Removed `enableMobile` as this enabled `wss://pubsub-edge.twitch.tv` into `connectSrc` for just mobile testing, but this is now a "base rule" regardless of integration slot

## V.1.0.4 - 2022-01-12
- Update Helmet to v5.0.1
- Change Defaults as needed to account for Helmet's new Defaults
- Some Readme tweaks and changes

## V.1.0.3 - 2022-01-27

- Disable helmet's `frameguard` and `xssFilter`, frameguard was blocking loading. This is now more similar to Twitch's current structure.
