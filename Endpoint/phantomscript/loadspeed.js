// Use 'page.injectJs()' to load the script itself in the Page context
system = require('system');
var page = require('webpage').create(),
    system = require('system'),
    t, address;

var GRACE_RENDER_TIME = 2000;
var url = system.args[1];
//page.settings.userAgent = system.args[4];
var numberOfPages = system.args[3];
var pagingAddition = system.args[4];
if (pagingAddition === undefined)
    pagingAddition = "";
var siteid = system.args[2];
var lastIteration = false;
page.customHeaders = {
    "X-DELGADO": "ON"
};

 


if (system.args.length === 1) {
    console.log('Usage: loadspeed.js <some URL>');
    phantom.exit(1);
} else {
    t = Date.now();
    address = system.args[1];
    page.open(address, function (status) {
        if (status !== 'success') {
            console.log('FAIL to load the address');
        } else {
            t = Date.now() - t;
            console.log('Page title is ' + page.evaluate(function () {
                return document.title;
            }));
            console.log('Loading time ' + t + ' msec');
        }
        phantom.exit();
    });
}