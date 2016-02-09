reproxy
=======

Simple utility, intended for proxying requests to remote services if CORS is not available for some reason. Usually this
is useful for development environments.

Install with `npm install hogart/reproxy -s`. Requires recent nodejs version (4.x should work).

## Usage

```js
const app = express();
require('reproxy')(app, [[/\someEndpoint\/(.*)/, 'http://real-endpoint/api/$1']]);
```

## Config

Config looks like following:
```js
[
    [/\someEndpoint\/(.*)/, 'http://real-endpoint/api/$1'], // regexp and replacement string
    [/\\otherEndpoint\/(.*)/, (match, group1) => { return 'http://other-endpoint/' + group1.split('/').reverse().join('/'); }], // regexp and replacement function
    ['/simpleString/', 'http://example.com'] // request will be made to `'http://example.com' + '/simpleString/'`;
]
```