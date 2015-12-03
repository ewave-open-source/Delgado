var _tunnelServer = (function () {
    
    var config = require('./config.js');
    var delgado = require('./delgado.js');
    var util = require('util');
    var fs = require('fs');
    var path = require('path');
    
    function _toPath(url) {
        return url.split('?')[0];

    }
    var mimeTypes = config.appSettings().mimeTypes;

    function _start(app) {
        
 
        app.get('/phantomscript/', function (req, res) {
            var options = {
                root: global.appRoot,
                dotfiles: 'deny',
                headers: {
                    'x-timestamp': Date.now(),
                    'x-sent': true
                }
            };
            // res.setEncoding('utf8');
            res.set('Content-Type', mimeTypes[".js"]);
            delgado.renderscript(req.query.id, function (result) {
                res.end(result, options);
            })
                
        });

        app.get('/*', function (req, res) {
            var options = {
                root: global.appRoot,
                dotfiles: 'deny',
                headers: {
                    'x-timestamp': Date.now(),
                    'x-sent': true
                }
            };
            // res.setEncoding('utf8');
            //res.set('Content-Type', mimeTypes[req.route.path.replace("/*", "")]);
            delgado.render(req.url, function (result, contentType) {
                res.set('Content-Type', contentType);
                res.set('Charset', 'utf-8');
                res.send(result);
            })
                
        });
        
        
       
        

        app.listen(config.appSettings().port, function () {
            console.log('Delgado tunnel listening on port ' + config.appSettings().port);
        });
    }
    return {
        start: _start
    };
})();
// node.js module export
module.exports = _tunnelServer;