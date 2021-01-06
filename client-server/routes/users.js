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
    res.json(obj);
  })
});

router.get('/:id', function(req, res, next) {
  client.get(`/users/${req.params.id}`, function (err, request, response, obj) {
    assert.ifError(err);
    res.json(obj);
  })
});

router.post('/', function(req, res, next) {
  client.post(`/users`, req.body, function (err, request, response, obj) {
    assert.ifError(err);
    res.json(obj);
  })
});

router.put('/', function(req, res, next) {
  client.put(`/users/${req.params.id}`, req.body, function (err, request, response, obj) {
    assert.ifError(err);
    res.json(obj);
  })
});

router.delete('/', function(req, res, next) {
  client.del(`/users/${req.params.id}`, function (err, request, response, obj) {
    assert.ifError(err);
    res.json(obj);
  })
});

module.exports = router;
