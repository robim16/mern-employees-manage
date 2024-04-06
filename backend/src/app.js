var express  = require("express"),
    app      = express(),
    http     = require("http"),
    server   = http.createServer(app),
    mongoose = require('mongoose'); 

app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

app.get('/', function(req, res) {
  res.send("Mucha suerte, el equipo de SALUDELECTRONICA te espera");
});

routes = require('./routes/empleados')(app);

mongoose.connect('mongodb://localhost/empleados', function(err, res) {
	if(err) {
		console.log('ERROR: No es posible conectarse con la base de datos, valide que el servicio de mongo este arriba ' + err);
	} else {
		console.log('Conexión con base de datos exitosa');
	}
});

server.listen(3000, function() {
  console.log("Servidor arriba en http://localhost:3000");
});