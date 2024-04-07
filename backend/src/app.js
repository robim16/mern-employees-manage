var express  = require("express"),
  app      = express(),
  http     = require("http"),
  server   = http.createServer(app)
 

const port = 3000

require('./database');
app.set('port', process.env.PORT || port)

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/', function(req, res) {
  res.send("Mucha suerte, el equipo de SALUDELECTRONICA te espera");
});

routes = require('./routes/empleados')(app);


server.listen(app.get('port'), function() {
  console.log("Servidor arriba en http://localhost:3000");
});