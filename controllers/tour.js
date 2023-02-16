const { response } = require("express")
const { db } = require("../Conexiones/slq")

const createTour= (request, response) => {
    const {nombres,apellidos,destino,duracion,estado,numero_personas,costo} = request.body

    db.query(`INSERT INTO tour (nombres,apellidos,destino,duracion,estado,numero_personas,costo) 
    VALUES ($1,$2,$3,$4,$5,$6,$7)`, [nombres,apellidos,destino,duracion,estado,numero_personas,costo], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Tour added with: ${nombres,apellidos,destino,duracion,estado,numero_personas,costo}`)
    })
}

const getAllTour = (request, response) => {

    db.query('SELECT * FROM tour', (error, results) => {
        if (error)
            throw error
        response.status(200).json(results.rows)
    })
}

const getTourById = (request, response) => {
    const id = request.params.id;
    console.log('id is ' + id)
    db.query('SELECT * FROM tour WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const updateTour = (request, response) => {
    const id = request.params.id;
    const {nombres,apellidos,destino,duracion,estado,numero_personas,costo} = request.body
    console.log('id is ' + id)

    db.query(`UPDATE tour SET nombres=$1, apellidos=$2,destino=$3,duracion=$4,estado=$5,numero_personas=$6,costo=$7 WHERE id=$8`, [nombres,apellidos,destino,duracion,estado,numero_personas,costo,id], (error, results) => {
        if (error) {
            throw error
        }
        
        response.status(200).send(`Tour modified with ${id}`)
    })
}

const deleteTour = (request, response) => {

    const id = request.params.id;
    console.log('id is ' + id)
    db.query('DELETE from tour WHERE id=$1', [id], (error, results) => {
        if (error)
            throw error
        response.status(200).send(`Deleted id is ${id}`)
    })
}


module.exports = {
    createTour,
    getAllTour,
    getTourById,
    updateTour,
    deleteTour

}