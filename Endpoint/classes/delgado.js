var _delgado = (function () {
    
    var config = require('./config.js');
    var dal = require('./dal.js');
    var util = require('util');
    var fs = require('fs');
    var path = require('path');
    
    function _toPath(url) {
        return url.split('?')[0];

    }
    
    
    
    function _render(url, callback) {
        
        var trigger = url.split("/")[1];

        dal.query("SELECT * FROM Websites WHERE AppRoot=@AppRoot", { "AppRoot": trigger }, function (list) {
            if (list.length == 0) {
                callback("no found", "text/html");

                return false;
            }
            var website = list[0];
            var contentType = website.ContentType;
            var finalUrl = website.BaseUrl + url.split(trigger)[1];
            
            var domain = website.BaseUrl.split("/")[2];
            if (website.Phantomize === true) {
                
                
                //var phantom = require('phantom');
                //var options = {
                
                //    path: "c:\\phantomjs\\",
                //    dnodeOpts: {
                //        weak: false
                //    }
                //}
                
                
                
                var childProcess = require('child_process')
                var phantomjs = require('phantomjs')
                var binPath = phantomjs.path
                var cookies = [];
                if (website.Cookies !== undefined && website.Cookies !== null) {
                    for (var i = 0; i < website.Cookies.length; i++)
                        cookies.push({
                            'name'     : website.Cookies[i].Name,   /* required property */
                            'value'    : website.Cookies[i].Value,  /* required property */
                            'domain'   : domain,
                            'path'     : '/',                /* required property */
                            'httponly' : true,
                            'secure'   : false,
                            'expires'  : (new Date()).getTime() + (1000 * 60 * 60)   /* <-- expires in 1 hour */
                        });
                    
                    

                    cookies = JSON.stringify(cookies);
                }
                    
                //--output-encoding=utf8 " + string.Format("\"{0}\\{1}\" {2}    \"{3}\"  \"{4}\"", HostingEnvironment.ApplicationPhysicalPath +
                // "\\phantomscript\\", "index.js", url, siteid.ToString(), HttpUtility.JavaScriptStringEncode(postScript), userAgent
                
                var childArgs = [
                    '--output-encoding=utf8  --ssl-protocol=any --ignore-ssl-errors=true  --local-to-remote-url-access=true  --web-security=false --remote-debugger-autorun=yes --remote-debugger-port=3010',
                    path.join(global.appRoot , '\\phantomscript\\' + website.hostingScript),
                    finalUrl,
                    website._id,
                    cookies,
                    website.NumberOfRepeats,
                    website.PhantomScript,
                    website.NumberOfPagesForFetch,
                    website.PagingAddition
                ]
                
                childProcess.execFile(binPath, childArgs, function (err, stdout, stderr) {
                    var tt = 1;
                    

                    try {
                        //stdout = stdout.split('<body>')[1].split('</body>')[0];
                   
                    
                        var loosethis = "Unsafe JavaScript attempt to access frame with URL about:blank from frame with URL";
                        stdout = stdout.split(loosethis)[0];
                    //convert to xml
                    var js2xmlparser = require("js2xmlparser2");
                    
                    var arrayData = JSON.parse(stdout);
                    stdout = js2xmlparser("feed", {item: arrayData});
                    

                        callback(stdout, contentType);
                   
                    } catch (ex) {
                        callback(stdout, contentType);
                    }
                     

  // handle results
                })
                
                

                //phantom.create(function (ph) {
                //    ph.createPage(function (page) {
                        
                //        page.onResourceRequested = function (request) {
                //            system.stderr.writeLine('= onResourceRequested()');
                //            system.stderr.writeLine('  request: ' + JSON.stringify(request, undefined, 4));
                //        };
                        
                //        page.onResourceReceived = function (response) {
                //            system.stderr.writeLine('= onResourceReceived()');
                //            system.stderr.writeLine('  id: ' + response.id + ', stage: "' + response.stage + '", response: ' + JSON.stringify(response));
                //        };
                        
                //        page.onLoadStarted = function () {
                //            system.stderr.writeLine('= onLoadStarted()');
                //            var currentUrl = page.evaluate(function () {
                //                return window.location.href;
                //            });
                //            system.stderr.writeLine('  leaving url: ' + currentUrl);
                //        };
                        
                //        page.onLoadFinished = function (status) {
                //            system.stderr.writeLine('= onLoadFinished()');
                //            system.stderr.writeLine('  status: ' + status);
                //        };
                        
                //        page.onNavigationRequested = function (url, type, willNavigate, main) {
                //            system.stderr.writeLine('= onNavigationRequested');
                //            system.stderr.writeLine('  destination_url: ' + url);
                //            system.stderr.writeLine('  type (cause): ' + type);
                //            system.stderr.writeLine('  will navigate: ' + willNavigate);
                //            system.stderr.writeLine('  from page\'s main frame: ' + main);
                //        };
                        
                //        page.onResourceError = function (resourceError) {
                //            system.stderr.writeLine('= onResourceError()');
                //            system.stderr.writeLine('  - unable to load url: "' + resourceError.url + '"');
                //            system.stderr.writeLine('  - error code: ' + resourceError.errorCode + ', description: ' + resourceError.errorString);
                //        };
                        
                //        page.onError = function (msg, trace) {
                //            system.stderr.writeLine('= onError()');
                //            var msgStack = ['  ERROR: ' + msg];
                //            if (trace) {
                //                msgStack.push('  TRACE:');
                //                trace.forEach(function (t) {
                //                    msgStack.push('    -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function + '")' : ''));
                //                });
                //            }
                //            system.stderr.writeLine(msgStack.join('\n'));
                //        };
                        
                        
                        
                        
                //        page.set('onLoadFinished', function (status) {
                //            if (status === 'success') {
                                
                //            } else {
                //                console.log(
                //                    "Error opening url \"" + page.reason_url 
                //    + "\": " + page.reason
                //                );
                //                console.log("Connection failed.");
                //                ph.exit();
                //            }
                            
                            
                //            console.log("opened google? ", status);
                //            var str = page.content;
                //            ph.exit();
                //            callback(str);
                          
                //        })
                //        page.open(finalUrl, function (status) {
                            
                //            if (status === 'success') {
                                
                //            } else {
                //                console.log(
                //                    "Error opening url \"" + page.reason_url 
                //    + "\": " + page.reason
                //                );
                //                console.log("Connection failed.");
                //                ph.exit();
                //            }
                            
                            
                //            console.log("opened google? ", status);
                //            var str = page.content;
                //            ph.exit();
                //            callback(str);
                          
                //        });
                //    }, {
                //        dnodeOpts: {
                //            weak: false
                //        }
                //    });
                //}, options);
                

               
            }
            else {
                callback("done", "text/html");
            }
        
        });
        
        var mimeTypes = config.appSettings().mimeTypes;
        

       
        
       
    }
    
    
    
    function _renderscript(id, callback) {
        
        dal.query("SELECT * FROM Websites WHERE _id=@id", { "_id": id }, function (list) {
            callback(list[0].PhantomScript);


        });

    }
    return {
        render: _render,
        renderscript: _renderscript
    };
})();
// node.js module export
module.exports = _delgado;