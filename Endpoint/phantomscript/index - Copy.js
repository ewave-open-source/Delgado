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
page.customHeaders = {
    "X-DELGADO": "ON"
};

page.onError = function (msg, trace) {
    var msgStack = ['ERROR: ' + msg];
    if (trace && trace.length) {
        msgStack.push('TRACE:');
        trace.forEach(function (t) {
            msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function + '")' : ''));
        });
    }
     
     console.error(msgStack.join('\n'));
};


var currentPage = 1;

fetchAndProccess(nextCallBack);


function nextCallBack()
{
    console.log(currentPage);
    
    
    if (currentPage <= numberOfPages) {
        currentPage++;
        
        if (currentPage == numberOfPages)
            lastIteration = true;

        fetchAndProccess(nextcallback);
    }
    else
        {
        setTimeout(function () {
            
        console.log(page.content);
        phantom.exit();
    }, GRACE_RENDER_TIME);
    }
}

function fetchAndProccess(nextcallback) {

    var pagingUrl = url;// + pagingAddition.replace("{0}", currentPage);
   
   
  


    page.open(pagingUrl, function (status) {
        
        
        if (status != 'success') {
            console.log("Failed to open URL " + pagingUrl + "(" + status + ")");
            phantom.exit();
        } else {
            
            
            page.includeJs('//code.jquery.com/jquery-2.1.4.min.js', function () {
                
                try {
                    page.includeJs('http://localhost:3002/phantomscript/?id=' + siteid, function () {
                        
                        
                        
                        nextcallback();


                    });
                }
                catch (e) {
                    var str = "";
                    page.content = e.message;
                    for (var x in e) {
                        str += x + ":" + e[x] + "</br>";
                    }
                    
                    
                    page.content =  str;
                    nextcallback();
                    //setTimeout(function () {
                    //    console.log(page.content);
                    //    phantom.exit();
                    //}, GRACE_RENDER_TIME);

                }

            });
        }
        


    });
}