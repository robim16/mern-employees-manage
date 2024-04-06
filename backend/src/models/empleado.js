var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var empleadoSchema = new Schema({
	nombre: { type: String },
	apellido: { type: String },	
	fechaNacimiento: { type: Date }, 
	sexo: { type: String },
	fechaIngreso: { type: Date }, 
	estrato: { type: Number, min: 0, max: 10 }
});


module.exports = mongoose.model('empleados', empleadoSchema);
//TODO:Modificar por fecha de nacimiento y calcular edad en la interfaz de usuario