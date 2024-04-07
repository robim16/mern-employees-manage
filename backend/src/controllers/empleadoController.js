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
    const { id } = req.params

    try {
        const empleado = await Empleados.find({_id: id});
        
        res.status(200).send({empleado})

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
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
        upsert: true,
        new: true
    }).then(empleadoUpdated => {

        return res.json(empleadoUpdated);

    }).catch(err => {

        return res.status(500).send({message: 'Error al modificar' + err});

    })
}


ctrl.deleteEmpleado = async (req, res) => {
    const { id } = req.params

    await Empleados.findByIdAndDelete({_id: id}).then(empleadoDeleted => {

        return res.json(empleadoDeleted);

    }).catch(err => {

       return res.status(500).send({message: 'Error al eliminar' + err});

    }); 
}


module.exports = ctrl;