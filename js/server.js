const express = require('express');
const connection = require('./conexion');
const cors = require('cors');
const app = express();

app.use(cors());

app.use(express.json());

/***************** BUSQUEDA JUEGOS ********************/
app.get('/api/buscar-juegos', (req, res) => {
  const parametroBusqueda = req.query.q;
  if (!parametroBusqueda || parametroBusqueda == '') {
    const buscarTodo = `SELECT * FROM vwjuegos`
    connection.query(buscarTodo, (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    })
} else {
  const query = `SELECT * FROM vwjuegos WHERE Nombre LIKE ?`;
  connection.query(query, [`%${parametroBusqueda}%`], (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
  }); 
}
});

app.get('/api/buscar-juegos-form', (req, res) => {
  const parametroBusqueda = req.query.q;
  const query = `SELECT * FROM juegos WHERE id_juego = ?`;
  connection.query(query, [parametroBusqueda], (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
  });
});

/************ INSERCIÓN DE JUEGOS *************/
app.post('/api/subir-juegos', (req, res) => {
  const { ID_Juego, Nombre, ID_Genero, Precio, Descripcion, Imagen, FechaDescuento, Descuento } = req.body;

  // Verificar si el ID ya existe
  const validar = 'SELECT COUNT(*) AS count FROM juegos WHERE id_juego = ?';
  connection.query(validar, [ID_Juego], (error, results) => {
      if (error) {
          console.error('Error al verificar la existencia del juego:', error);
          return res.status(500).json({ error: 'Error en el servidor' });
      }

      const exists = results[0].count > 0;

      if (exists) {
          // Si existe, realiza un UPDATE
          const updateQuery = 'UPDATE juegos SET Nombre = ?, ID_Genero = ?, Precio = ?, Descripcion = ?, Imagen = ?, FechaDescuento = ?, Descuento = ? WHERE ID_Juego = ?';
          const updateValues = [Nombre, ID_Genero, Precio, Descripcion, Imagen, FechaDescuento, Descuento, ID_Juego];

          connection.query(updateQuery, updateValues, (updateError, updateResults) => {
              if (updateError) {
                  console.error('Error al actualizar datos en la base de datos:', updateError);
                  return res.status(500).json({ error: 'Error en el servidor' });
              }
              res.status(200).json({ message: 'Juego actualizado correctamente' });
          });
      } else {
          // Si no existe, realiza un INSERT
          const insertQuery = 'INSERT INTO juegos (ID_Juego, Nombre, ID_Genero, Precio, Descripcion, Imagen, FechaDescuento, Descuento) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
          const insertValues = [ID_Juego, Nombre, ID_Genero, Precio, Descripcion, Imagen, FechaDescuento, Descuento];

          connection.query(insertQuery, insertValues, (insertError, insertResults) => {
              if (insertError) {
                  console.error('Error al insertar datos en la base de datos:', insertError);
                  return res.status(500).json({ error: 'Error en el servidor' });
              }
              res.status(201).json({ message: 'Juego insertado correctamente', id: insertResults.insertId });
          });
      }
  });
});

app.delete('/api/borrar-juegos/:id', (req, res) => {
  const {id} = req.params;
  const query = `DELETE FROM juegos WHERE id_juego = ?`;
  connection.query(query, [id], (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
  });
});

/*********** CATEGORIAS ************/

app.get('/api/obtener-categorias', (req, res) => {
    const query = `SELECT * FROM generos`;
    connection.query(query, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
  });

  app.get('/api/buscar-categorias-form', (req, res) => {
    const parametroBusqueda = req.query.q;
    const query = `SELECT * FROM generos WHERE ID_Genero = ?`;
    connection.query(query, [parametroBusqueda], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
  });

  app.get('/api/filtro-categorias', (req, res) => {
    const genero = req.query.id;
    console.log('ID de categoría recibido:', genero); 
    const query = `SELECT * FROM juegos WHERE id_genero = ?`;
    connection.query(query, [genero], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
  });

  app.post('/api/subir-categorias', (req, res) => {
    const { ID_Genero, Nombre } = req.body;
  
    // Verificar si el ID ya existe
    const validar = 'SELECT COUNT(*) AS count FROM generos WHERE id_genero = ?';
    connection.query(validar, [ID_Genero], (error, results) => {
        if (error) {
            console.error('Error al verificar la existencia del genero:', error);
            return res.status(500).json({ error: 'Error en el servidor' });
        }
  
        const exists = results[0].count > 0;
  
        if (exists) {
            const updateQuery = 'UPDATE generos SET Nombre = ? WHERE ID_Genero = ?';
            const updateValues = [Nombre, ID_Genero];
  
            connection.query(updateQuery, updateValues, (updateError, updateResults) => {
                if (updateError) {
                    console.error('Error al actualizar datos en la base de datos:', updateError);
                    return res.status(500).json({ error: 'Error en el servidor' });
                }
                res.status(200).json({ message: 'Genero actualizado correctamente' });
            });
        } else {
            const insertQuery = 'INSERT INTO generos (ID_Genero, Nombre) VALUES (?, ?)';
            const insertValues = [ID_Genero, Nombre];
  
            connection.query(insertQuery, insertValues, (insertError, insertResults) => {
                if (insertError) {
                    console.error('Error al insertar datos en la base de datos:', insertError);
                    return res.status(500).json({ error: 'Error en el servidor' });
                }
                res.status(201).json({ message: 'Genero insertado correctamente', id: insertResults.insertId });
            });
        }
    });
  });


  app.delete('/api/borrar-categorias/:id', (req, res) => {
    const {id} = req.params;
    const query = `DELETE FROM generos WHERE ID_Genero = ?`;
    connection.query(query, [id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
  });


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

