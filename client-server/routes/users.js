var express = require('express');
var router = express.Router();
var assert = require('assert');
var restify = require('restify-clients');

// Creates a JSON client
var client = restify.createJSONClient({
  url: 'http://127.0.0.1:4000' // host onde o server está rodando
});

/* GET users listing. */
router.get('/', function(req, res, _next) {
  client.get('/users', function (err, _request, _response, obj) {
    assert.ifError(err);
    res.json(obj);
  })
});

router.get('/:id', function(req, res, _next) {
  client.get(`/users/${req.params.id}`, function (err, _request, _response, obj) {
    assert.ifError(err);
    res.json(obj);
  })
});

router.post('/', function(req, res, _next) {
  client.post(`/users`, req.body, function (err, _request, _response, obj) {
    assert.ifError(err);
    res.json(obj);
  })
});

router.put('/:id', function(req, res, _next) {
  client.put(`/users/${req.params.id}`, req.body, function (err, _request, _response, obj) {
    console.log("entrou no put")
    assert.ifError(err);
    res.json(obj);
  })
});

router.delete('/:id', function(req, res, _next) {
  client.del(`/users/${req.params.id}`, function (err, _request, _response, obj) {
    assert.ifError(err);
    res.json(obj);
  })
});

module.exports = router;
