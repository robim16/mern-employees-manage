const mongoose = require('mongoose'); 

mongoose.connect('mongodb://127.0.0.1:27017/empleados', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(db => console.log('Conexión establecida con la base de datos'))
    .catch(error => console.log('ERROR: No es posible conectarse con la base de datos, valide que el servicio de mongo este arriba ' + err))



