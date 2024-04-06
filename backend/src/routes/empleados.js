const empleadoCtrl = require('../controllers/empleadoController')

module.exports = function (app) {
	//punto de entrada de los metodos
	app.get('/empleados', empleadoCtrl.findAllEmpleados);
	app.get('/empleado/:id', empleadoCtrl.findById);
	app.post('/empleado', empleadoCtrl.addEmpleado);
	app.put('/empleado/:id', empleadoCtrl.updateEmpleado);
	app.delete('/empleado/:id', empleadoCtrl.deleteEmpleado);

}