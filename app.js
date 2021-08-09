var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

app.use(function(req, res, next){
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.listen(9090, function(){ console.log('Servidor Web rodando na porta 9090') });

app.get('/api/anuncios', function(req, res){
  fs.readFile('db.json', 'utf8', function(err, data){
    if (err) {
      var response = {status: 'falha', resultado: err};
      res.json(response);
    } else {
      var obj = JSON.parse(data);
      var result = 'Nenhum anúncio foi encontrado';
      if(req.query.id != null){
        obj.anuncios.forEach(function(anuncio) {
          if (anuncio != null) {
            if (anuncio.id == req.query.id) {
              result = anuncio;
            }
          }
        });

      }else{
        result = obj.anuncios;
      }

      var response = {status: 'sucesso', resultado: result};
      res.json(response);
    }
  });
});

app.get('/api/modelos', function(req, res){
  fs.readFile('db.json', 'utf8', function(err, data){
    if (err) {
      var response = {status: 'falha', resultado: err};
      res.json(response);
    } else {
      var obj = JSON.parse(data);
      var result = 'Nenhum modelo foi encontrado';
      if(req.query.id != null){
        obj.modelos.forEach(function(modelo) {
          if (modelo != null) {
            if (modelo.id == req.query.id) {
              result = modelo;
            }
          }
        });

      }else{
        result = obj.modelos;
      }

      var response = {status: 'sucesso', resultado: result};
      res.json(response);
    }
  });
});

app.get('/api/anos', function(req, res){
  fs.readFile('db.json', 'utf8', function(err, data){
    if (err) {
      var response = {status: 'falha', resultado: err};
      res.json(response);
    } else {
      var obj = JSON.parse(data);
      var result = 'Nenhum ano foi encontrado';
      if(req.query.id != null){
        obj.anos.forEach(function(ano) {
          if (ano != null) {
            if (ano.id == req.query.id) {
              result = ano;
            }
          }
        });

      }else{
        result = obj.anos;
      }

      var response = {status: 'sucesso', resultado: result};
      res.json(response);
    }
  });
});

app.post('/api/anuncios', function(req, res){
  fs.readFile('db.json', 'utf8', function(err, data){
    if (err) {
      var response = {status: 'falha', resultado: err};
      res.json(response);
    } else {
      var obj = JSON.parse(data);
      req.body.id = obj.anuncios.length + 1;

      obj.anuncios.push(req.body);

      fs.writeFile('db.json', JSON.stringify(obj), function(err) {
        if (err) {
          var response = {status: 'falha', resultado: err};
          res.json(response);
        } else {
          var response = {status: 'sucesso', resultado: 'Registro incluso com sucesso'};
          res.json(response);
        }
      });
    }
  });
});

app.put('/api/anuncios', function(req, res){
  fs.readFile('db.json', 'utf8', function(err, data){
    if (err) {
      var response = {status: 'falha', resultado: err};
      res.json(response);
    } else {
      var obj = JSON.parse(data);

      obj.anuncios[(req.body.id - 1)].nome = req.body.nome;
      obj.anuncios[(req.body.id - 1)].site = req.body.site;

      fs.writeFile('db.json', JSON.stringify(obj), function(err) {
        if (err) {
          var response = {status: 'falha', resultado: err};
          res.json(response);
        } else {
          var response = {status: 'sucesso', resultado: 'Registro editado com sucesso'};
          res.json(response);
        }
      });
    }
  });
});

app.delete('/api/anuncios', function(req, res){
  fs.readFile('db.json', 'utf8', function(err, data){
    if (err) {
      var response = {status: 'falha', resultado: err};
      res.json(response);
    } else {
      var obj = JSON.parse(data);

      delete obj.anuncios[(req.body.id - 1)];

      fs.writeFile('db.json', JSON.stringify(obj), function(err) {
        if (err) {
          var response = {status: 'falha', resultado: err};
          res.json(response);
        } else {
          var response = {status: 'sucesso', resultado: 'Registro excluído com sucesso'};
          res.json(response);
        }
      });
    }
  });
});
