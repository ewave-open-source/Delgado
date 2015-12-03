var Dal = (function () {
    
    
    var util = require('util');
    var fs = require('fs');
    var path = require('path');
    var config = require('../config.js');
    var ObjectID = require("mongodb").ObjectID;
    
    //var couchbase = require('couchbase');
    
    //fs.readFile('./config/site.json', 'utf8', function (err, data) {
    //    if (err) throw err;
    //    obj = JSON.parse(data);
    //});   
    
    var private_variable = 'value';
    function private_function() {
        return obj;
    }
    
    var assert = require('assert');
    
    
    var insertDocument = function (db, callback) {
        
        
        //  db.collection('users').deleteMany(
        //      { "email": "roi@ewave.co.il" },
        //function (err, results) {
        //          console.log(results);
        //          callback();
        //      }
        //  );
        
        //  return;
        
        var guid = require("guid");
        var actionGuid = guid.create().value;
        
        db.collection('users').insertOne({
            "id": xx,
            "email" : "roi@ewave.co.il",
            "password": "123456"
        }, function (err, result) {
            assert.equal(err, null);
            console.log("Inserted a document into the users collection.");
            callback(result);
        });
    };
    
    function parse(str, params) {
        var res = { collection: "", where: {}, values: {} }
        
        var x = str.split(" ")
        res.queryMode = x[0].trim();
        
        if (x[2] == "SET") {
            var pairs = str.substring(str.indexOf("SET") + 3).split(",");
            for (var j = 0; j < pairs.length; j++) {
                var triple = pairs[j].split("=");
                res.values[triple[0].trim()] = params[triple[0].trim()];
            }
        }
        
        
        
        
        for (var i = 0; i < x.length; i++) {
            if (x[i] == "UPDATE")
                res.collection = x[i + 1];
            
            
            
            
            
            
            if (x[i] == "FROM")
                res.collection = x[i + 1];
            
            
            if (x[i] == "INTO") {
                
                
                var actionGuid = require("guid").create().value;
                res.values["id"] = actionGuid;
                res.collection = x[i + 1];
                var pairs = str.split("INTO " + res.collection)[1].split(",");
                for (var j = 0; j < pairs.length; j++) {
                    var triple = pairs[j].split("=");
                    res.values[triple[0].trim()] = params[triple[0].trim()];


                }
            }
            if (x[i] == "WHERE") {
                var pairs = str.substring(str.indexOf("WHERE") + 6).split("AND");
                for (var j = 0; j < pairs.length; j++) {
                    var triple = pairs[j].split("=");
                    res.where[triple[0].trim()] = params[triple[0].trim()];


                }


            }
        }
        
        
        return res;


    }
    
    
    
    
    function _getAll(callback) {
        var url = config.appSettings().mongodb.host;
        var Db = require('mongodb').Db;
        var Server = require('mongodb').Server;
        
        var db = new Db('scripter', new Server('localhost', 27017));
        // Establish connection to db
        db.open(function (err, db1) {
            assert.equal(null, err);
            // Return the information of a all collections, using the callback format
            db.collections(function (err, items) {
                assert.ok(items.length > 0);
                var fitems = [];
                for (var i = 0; i < items.length; i++) {
                    fitems.push(items[i].s.name);
                }
                callback(fitems);
            });
        });
    }
    
    function _getCollection(name, callback) {
        Dal.query("SELECT * FROM " + name, {}, callback);
    }
    
    function _getSingle(name, id, callback) {
        Dal.query("SELECT * FROM " + name + " WHERE id=@id", { "id": id }, callback);
    }
    
    
    
    
    function _saveSchema(name, schema, callback) {
        Dal.query("INSERT INTO schemas name=@name, schema=@schema" , { "name": name, "schema": schema }, callback);
    }
    
    function _getSchema(name, callback) {
        Dal.query("SELECT * FROM schemas WHERE name=@name" , { "name": name }, callback);
    }
    
    
    function _insertOrUpdate(queryStr, params, callback) {
        
        var oQuery = parse(queryStr, params);
        var url = config.appSettings().mongodb.host;
        var MongoClient = require('mongodb').MongoClient;
        
        collection.insert({ hello: 'world_no_safe' });

    }
    
    function _deleteCollection(collection, id, callback) {
        var url = config.appSettings().mongodb.host;
        var MongoClient = require('mongodb').MongoClient;
        
        MongoClient.connect(url, function (err, db) {
            assert.equal(null, err);
            
            db.collection(collection).findAndRemove({ "id": id }, function (err, doc) {
                assert.equal(null, err);
                
                callback(doc);
            });

                    
                    
                    
                     



        });


    }
    
    function _query(queryStr, params, callback) {
        var oQuery = parse(queryStr, params);
        
        var url = config.appSettings().mongodb.host;
        var MongoClient = require('mongodb').MongoClient;
        
        //if (oQuery.where["_id"] !== undefined) {
        //    oQuery.where["_id"] = ObjectID(oQuery.where["_id"]);
        //}
        
        
        MongoClient.connect(url, function (err, db) {
            assert.equal(null, err);
            
            switch (oQuery.queryMode) {
                case "INSERT":
                    db.collection(oQuery.collection).insertOne(oQuery.values
                        , function (err, result) {
                        assert.equal(err, null);
                        console.log("Inserted a document into the users collection.");
                        callback(result);
                    });
                    
                    break;
                case "DELETE":
                    db.collection(oQuery.collection).remove(oQuery.where
                        , function (err, result) {
                        assert.equal(err, null);
                        console.log("Inserted a document into the users collection.");
                        callback(result);
                    });
                    
                    break;
                case "UPDATE":
                    db.collection(oQuery.collection).save(oQuery.values
                        , function (err, result) {
                        assert.equal(err, null);
                        console.log("Inserted a document into the users collection.");
                        callback(result);
                    });
                    
                    break;
                case "SELECT":
                    var retArr = [];
                    var cursor;
                    var whereFlag = false;
                    for (var i in oQuery.where)
                        whereFlag = true;
                    
                    if (whereFlag)
                        cursor = db.collection(oQuery.collection).find(oQuery.where);
                    else
                        cursor = db.collection(oQuery.collection).find();
                    
                    cursor.each(function (err, doc) {
                        assert.equal(err, null);
                        if (doc != null) {
                            retArr.push(doc);
                     
                        } else {
                            callback(retArr)
                        }
                    });
                    break;
            }
        });

    }
    
    return {
        insertOrUpdate: _insertOrUpdate,
        query: _query,
        getAll: _getAll,
        getCollection: _getCollection,
        getSingle: _getSingle,
        deleteCollection: _deleteCollection,
        saveSchema: _saveSchema,
        getSchema: _getSchema
     
    };
})();
// node.js module export
module.exports = Dal;