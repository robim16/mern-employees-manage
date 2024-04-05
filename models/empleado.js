var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var empleadoSchema = new Schema({
	nombre: { type: String },
	apellido: { type: String },	
	edad: { type: Number }, //TODO:Modificar por fecha de nacimiento y calcular edad en la interfaz de usuario
	genero: { type: String }
});


module.exports = mongoose.model('empleados', empleadoSchema);