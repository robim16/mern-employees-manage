const ctrl = {}
const Empleados = require('../models/empleado')


ctrl.findAllEmpleados = async (req, res) => {
    try {
        const empleados = await Empleados.find()
            .sort({'created': -1})
            .exec();
        
        res.status(200).send({empleados})
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
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

    const empleado = new Empleados({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        fechaNacimiento: new Date(req.body.fechaNacimiento),
        sexo: req.body.sexo,
        fechaIngreso: new Date(req.body.fechaIngreso),
        estrato: req.body.estrato
    });

    await empleado.save().then((emp) => {
        res.status(200).send({emp})
    }).catch((error) => {
        res.status(500).send({message: 'no pudo registrarse el empleado' + error.message})
    });
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