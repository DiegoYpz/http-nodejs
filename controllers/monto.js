const { response } = require("express")
const { db } = require("../Conexiones/slq")

const getAllMonto = (request, response) => {

    db.query('select * from gest_adm_monto order by mon_id', (error, results) => {
        if (error)
            throw error
        response.status(200).json(results.rows)
    })
}

const getByMonto = (request, response) => {

    const mon_id = request.params.mon_id;

    console.log('id' + mon_id)
    db.query('SELECT * FROM gest_adm_monto WHERE mon_id = $1', [mon_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createMonto = (request, response) => {
    const { mon_id, mon_precio } = request.body

    db.query('INSERT INTO gest_adm_monto (mon_id, mon_precio) VALUES ($1, $2)', [mon_id, mon_precio], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Cuota added with ID: ${mon_id}`)
    })
}

const updateMonto = (request, response) => {
    const mon_id = request.params.mon_id;
    const { mon_precio } = request.body
    console.log('id' + mon_id)

    db.query('update gest_adm_monto set  mon_precio=$1 where mon_id=$2', [mon_precio, mon_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Cuota modified with ${mon_id}`)
    })
}

const deleteMonto = (request, response) => {

    const mon_id = request.params.mon_id;

    console.log('id' + mon_id)

    db.query('delete from gest_adm_monto where mon_id=$1', [mon_id], (error, results) => {
        if (error)
            throw error
        response.status(200).send(`Delete id ${mon_id}`)
    })
}

module.exports = {
    getAllMonto,
    getByMonto,
    createMonto,
    updateMonto,
    deleteMonto

}