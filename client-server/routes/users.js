var express = require('express');
var router = express.Router();
var assert = require('assert');
var restify = require('restify-clients');

// Creates a JSON client
var client = restify.createJSONClient({
  url: 'http://127.0.0.1:4000' // host onde o server está rodando
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  client.get('/users', function (err, request, response, obj) {
    assert.ifError(err);
    res.end(JSON.stringify(obj, null, 2));
  })
});

module.exports = router;
