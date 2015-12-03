system = require('system');
var page = require('webpage').create();
var GRACE_RENDER_TIME = 2000;
var url = system.args[1];
var siteid = system.args[2];
var cookies = system.args[3];
var repeat = system.args[4];
var evalScript = system.args[5];
//page.settings.userAgent = system.args[4];
var numberOfPages = system.args[5];
var pagingAddition = system.args[6];
if (pagingAddition === undefined)
    pagingAddition = "";

var lastIteration = false;
page.customHeaders = {
    "X-DELGADO": "ON"
};

 
 


phantom.onError = function (msg, trace) {
    var msgStack = ['PHANTOM ERROR: ' + msg];
    if (trace && trace.length) {
        msgStack.push('TRACE:');
        trace.forEach(function (t) {
            msgStack.push(' -> ' + (t.file || t.sourceURL) + ': ' + t.line + (t.function ? ' (in function ' + t.function + ')' : ''));
        });
    }
   // console.error(msgStack.join('\n'));
    //phantom.exit(1);
};



var cookieResult = false;
//if (cookies !== "[]") {
//    cookies = JSON.parse(cookies);
//    for (var i = 0; i < cookies.length; i++) {
//        cookieResult = phantom.addCookie(cookies[i]);
//    }

//}
setPageEvents(page);
function setPageEvents(xpage)
{
    xpage.onError = function (msg, trace) {
        var msgStack = ['ERROR: ' + msg];
        if (trace && trace.length) {
            msgStack.push('TRACE:');
            trace.forEach(function (t) {
                msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function + '")' : ''));
            });
        }
        //console.error(msgStack.join('\n'));
        //phantom.exit(1);
        //console.error(msgStack.join('\n'));
    };
}




page.onLoadFinished = function (status) {
    //console.log(page.content);
   // phantom.exit(1);
  // Do other things here...
};

var currentPage = 1;
var repeated = 0;
var pagingUrl = url;// + pagingAddition.replace("{0}", currentPage);
fetch();

function fetch() {
  
    page.open(pagingUrl, function (status) {
        if (status != 'success') {
            console.log("Failed to open URL " + pagingUrl + "(" + status + ")");
            phantom.exit();
        } else {
            
         

            repeated++;
            //page.evaluate(function () {
            //    document.cookie; // => "test=test-value;"
            //});
            //page.cookies; // => [{
            //   domain: "example.com",
            //   expires: "Wed, 08 Jan 2014 00:00:00 GMT"
            //   httponly: false,
            //   name: "test",
            //   path: "/",
            //   secure: false,
            //   value: "test-value"
            // }]
            
           
            
            if (repeated < repeat) {
                page.close();
                page = require('webpage').create();
                setPageEvents(page);
                fetch();
                return;
            }
           
          
            page.includeJs('//code.jquery.com/jquery-2.1.4.min.js', function () {
                
                
               
                setTimeout(function () {

                    console.log(page.content);
                    page.close();
                    phantom.exit(1);
                }, 15000);
                
               

                var logoUrl = page.evaluate(function (escript){ eval(escript); return xxxxxxxxxxxxxx(); }, evalScript);
                
                console.log(JSON.stringify(logoUrl));
                
                phantom.exit(1);
                return;

                //var result = page.evaluate(function(escript) {
                //    return "xxxx";               
                //    //return eval(escript);
                    
                //}, evalScript);
                

                console.log(result);
                phantom.exit();

               

            });
        }
        


    });

}


