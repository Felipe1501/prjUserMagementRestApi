var express = require('express');
var assert = require('assert');
var restify = require('restify-clients');
var router = express.Router();

var client = restify.createJsonClient({
  url: 'http://localhost:4000'
});



/* GET users listing. */
//método get, que traz todos os users cadastrados
router.get('/', function(req, res, next) {
  client.get('/users', function(err, request, response, obj) {
    assert.ifError(err);
  
    res.json(obj);
  });
});

//método get, que traz apenas o id que foi inserido para busca
router.get('/:id', function(req, res, next) {
  client.get(`/users/${req.params.id}`, function(err, request, response, obj) {
    assert.ifError(err);
  
    res.json(obj);
  });

//método put, que editas os cadastros
router.put('/:id', function(req, res, next) {
    client.put(`/users/${req.params.id}`, req.body, function(err, request, response, obj) {
      assert.ifError(err);
    
      res.json(obj);
    });
  });

  //método delete, que deleta o user com id selecionado
  router.delete('/:id', function(req, res, next) {
      client.del(`/users/${req.params.id}`, function(err, request, response, obj) {
        assert.ifError(err);
      
        res.json(obj);
      });
    });

    //método post, que traz os novos dados dos users cadastrados
    router.post('/', function(req, res, next) {
        client.post(`/users`, req.body, function(err, request, response, obj) {
          assert.ifError(err);
        
          res.json(obj);
        });
      });
});


module.exports = router;
