const { response } = require("express")
const { db } = require("../Conexiones/slq")

const createindemnizacion= (request, response) => {
    const {ind_fecha,ind_descripcion,ind_estado,ind_total,res_id} = request.body

    db.query(`INSERT INTO cont_indemnizacion (ind_fecha,ind_descripcion,ind_estado,ind_total,res_id) 
    VALUES ($1,$2,$3,$4,$5)`, [ind_fecha,ind_descripcion,ind_estado,ind_total,res_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`indemnizacion added with: ${ind_fecha,ind_descripcion,ind_estado,ind_total,res_id}`)
    })
}

const getAllindemnizacion = (request, response) => {

    db.query('SELECT i.*, CONCAT (ssp.per_nombres, ssp.per_apellidos) as residente from cont_indemnizacion i inner join seg_sis_residente ssr on i.res_id=ssr.res_id inner join seg_sis_persona ssp on ssr.per_id=ssp.per_id', (error, results) => {
        if (error)
            throw error
        response.status(200).json(results.rows)
    })
}

const getindemnizacionById = (request, response) => {
    const ind_id = request.params.ind_id;
    console.log('id is ' + ind_id)
    db.query('SELECT * FROM cont_indemnizacion WHERE ind_id = $1', [ind_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const updateindemnizacion = (request, response) => {
    const ind_id = request.params.ind_id;
    const {ind_fecha,ind_descripcion,ind_estado,ind_total,res_id} = request.body
    console.log('id is ' + ind_id)

    db.query(`UPDATE cont_indemnizacion SET ind_fecha=$1, ind_descripcion=$2, ind_estado=$3, ind_total=$4,res_id=$5 WHERE ind_id=$6`, [ind_fecha,ind_descripcion,ind_estado,ind_total,res_id,ind_id], (error, results) => {
        if (error) {
            throw error
            console.log(error)
        }
        
        response.status(200).send(`indemnizacion modified with ${ind_id}`)
    })
}

const deleteindemnizacion = (request, response) => {

    const ind_id = request.params.ind_id;
    console.log('id is ' + ind_id)
    db.query('DELETE from cont_indemnizacion WHERE ind_id=$1', [ind_id], (error, results) => {
        if (error)
            throw error
        response.status(200).send(`Deleted id is ${ind_id}`)
    })
}


module.exports = {
    createindemnizacion,
    getAllindemnizacion,
    getindemnizacionById,
    updateindemnizacion,
    deleteindemnizacion

}