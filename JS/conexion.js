const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost', 
    user: 'admin', 
    password: 'adminadmin', // Cambiar por la contraseña del usuario
    database: 'gameshunter' // Cambiar por el nombre de la base de datos
});

// Conectar a la base de datos
connection.connect((err) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err);
        return;
    }
    console.log('Conexión exitosa a la base de datos');
});

module.exports = connection;
