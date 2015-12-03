// Use 'page.injectJs()' to load the script itself in the Page context
system = require('system');
var page = require('webpage').create();
var GRACE_RENDER_TIME = 2000;
var url = system.args[1];
//page.settings.userAgent = system.args[4];
var numberOfPages = system.args[3];
var pagingAddition = system.args[4];
if (pagingAddition === undefined)
    pagingAddition = "";
var siteid = system.args[2];
var lastIteration = false;




if (typeof (phantom) !== "undefined") {
 
    
    // Route "console.log()" calls from within the Page context to the main Phantom context (i.e. current "this")
    page.onConsoleMessage = function (msg) {
        console.log(msg);
    };
    
    page.onAlert = function (msg) {
        console.log(msg);
    };
    
    console.log("* Script running in the Phantom context.");
    console.log("* Script will 'inject' itself in a page...");
    page.open(url, function (status) {
        if (status === "success") {
            console.log(page.content);
            //console.log(page.injectJs('http://localhost:3002/phantomscript/?id=' + siteid) ? "... done injecting itself!" : "... fail! Check the $PWD?!");
        }
        phantom.exit();
    });
} else {
    alert("* Script running in the Page context.");
}