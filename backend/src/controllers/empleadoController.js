const ctrl = {}
const Empleados = require('../models/empleado')


ctrl.findAllEmpleados = async (req, res) => {
    await Empleados.find(function (err, empleado) {
        if (!err) {
            res.send(empleado);
        } else {
            console.log('ERROR: ' + err);
        }
    });
}


ctrl.findById = async (req, res) => {
    const id = req.params.id

    await Empleados.find({_id: id}, function(err, empleado){
        if (!err) {
            res.send(empleado)
        } else {
            console.log('ERROR: ' + err);
        }
    })
}


ctrl.addEmpleado = async (req, res) => {

    var empleado = new Empleados({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        fechaNacimiento: req.body.fechaNacimiento,
        sexo: req.body.sexo,
        fechaIngreso: req.body.fechaIngreso,
        estrato: req.body.estrato
    });

    await empleado.save(function (err) {
        if (!err) {
            console.log('Created');
        } else {
            console.log('ERROR: ' + err);
        }
    });

    res.send(empleado);
};



ctrl.updateEmpleado = async (req, res) => {
    const { id } = req.params

    try {
        await Empleados.findByIdAndUpdate({_id: id}, {
            $set: {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                fechaNacimiento: req.body.fechaNacimiento,
                sexo: req.body.sexo,
                fechaIngreso: req.body.fechaIngreso,
                estrato: req.body.estrato
            }
        },
        {
            upsert: true
        }).then(empleadoUpdated => {

            return res.json(empleadoUpdated);

        }).catch(err => {

           return res.status(500).send({message: 'Error al modificar' + err});
    
        })

    } catch (error) {
        res.status(500).json({
            message: err.message
        });
    }
}


ctrl.deleteEmpleado = async (req, res) => {
    const { id } = req.params

    await Empleados.findByIdAndDelete(id, function (err, empleado) { 
        if (err){ 
            console.log(err) 
        } 
        else{ 
            console.log("Deleted : ", empleado); 
        } 
    }); 
}


module.exports = ctrl;