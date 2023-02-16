// const pgPromise = require('pg-promise')
const { Pool } = require('pg');
const pool = new Pool({
    // host: 'containers-us-west-106.railway.app',
    // port: '7745',
    // database: 'railway',
    // user: 'postgres',
    // password: '9oIfwpQVwiq0Eaw3d3IW',

    host: 'localhost',
    port: '5432',
    database: 'bienes',
    user: 'postgres',
    password: 'Konan0986',
    
    // ssl: {
    //     rejectUnauthorized: false,
    // }
});

exports.db = pool