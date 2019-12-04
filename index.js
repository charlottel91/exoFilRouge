const express = require('express');
const app = express();
const port = 4000;
const connection = require('./conf');
const bodyParser = require('body-parser');

// Support JSON-encoded bodies
app.use(bodyParser.json());
// Support URL-encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
}));

//////// REQUETE 1 //////
app.get('/', (req, res) => {
  // TODO récupération des données (étape 2)*
  connection.query('SELECT * FROM SuperDev', (err, results) => {
    // TODO envoyer les données récupérées (étape 3)
    if (err) {
      res.status(500).send('Erreur lors de la récupération des dev');
    } else {
      res.json(results);
    }
  });
});

//////// REQUETE 2 //////

app.get('/name', (req, res) => {
    // TODO récupération des données (étape 2)*
    connection.query('SELECT name FROM SuperDev', (err, results) => {
      // TODO envoyer les données récupérées (étape 3)
      if (err) {
        res.status(500).send('Erreur lors de la récupération des dev');
      } else {
        res.json(results);
      }
    });
  });


  //////// REQUETE 3 //////

  app.get('/name/filterbegan', (req, res) => {
    // TODO récupération des données (étape 2)*
    connection.query('SELECT name FROM SuperDev where name like "C%"', (err, results) => {
      // TODO envoyer les données récupérées (étape 3)
      if (err) {
        res.status(500).send('Erreur lors de la récupération des dev');
      } else {
        res.json(results);
      }
    });
  });

 //////// REQUETE 4 //////

 app.get('/name/filterhave', (req, res) => {
    // TODO récupération des données (étape 2)*
    connection.query('SELECT name FROM SuperDev WHERE name LIKE "%lx%"', (err, results) => {
      // TODO envoyer les données récupérées (étape 3)
      if (err) {
        res.status(500).send('Erreur lors de la récupération des dev');
      } else {
        res.json(results);
      }
    });
 })

   //////// REQUETE 5 //////

   app.get('/name/filterid', (req, res) => {
    // TODO récupération des données (étape 2)*
    connection.query('SELECT * FROM SuperDev WHERE id<3', (err, results) => {
      // TODO envoyer les données récupérées (étape 3)
      if (err) {
        res.status(500).send('Erreur lors de la récupération des dev');
      } else {
        res.json(results);
      }
    });
  })


  
   //////// REQUETE 6 //////

   app.get('/name/birthday/:order', (req, res) => {
    const order = req.params.order;
    // TODO récupération des données (étape 2)*
    connection.query(`SELECT * FROM SuperDev ORDER BY birthday ${order}`, order, (err, results) => {
      // TODO envoyer les données récupérées (étape 3)
      if (err) {
        res.status(500).send('Erreur lors de la récupération des dev');
      } else {
        res.json(results);
      }
    });
  })

   //////// REQUETE 7 //////

   app.get('/:id', (req, res) => {
     const idDev = req.params.id
    // TODO récupération des données (étape 2)*
    connection.query('SELECT * FROM SuperDev WHERE  id=?', idDev, (err, results) => {
      // TODO envoyer les données récupérées (étape 3)
      if (err) {
        res.status(500).send('Erreur lors de la récupération des dev');
      } else {
        res.json(results);
      }
    });
  });

   app.post('/name/post', (req, res) => {
    const formData = req.body;
    // TODO récupération des données (étape 2)*
    connection.query('INSERT INTO SuperDev SET ?', formData, (err, results) => {
      // TODO envoyer les données récupérées (étape 3)
      if (err) {
        res.status(500).send('Erreur lors du post d un nouveau dev');
      } else {
        res.sendStatus(200);
      }
    });
  });


     //////// REQUETE 8 //////

  app.put('/name/:id', (req, res) => {
    const idDev = req.params.id;
    const formData = req.body;
  // TODO récupération des données (étape 2)*
    connection.query('UPDATE SuperDev SET ? WHERE id=?', [formData, idDev], err => {
        // TODO envoyer les données récupérées (étape 3)
        if (err) {
        console.log(err);
        res.status(500).send('Erreur lors de la modif du dev');
      } else {
        res.sendStatus(200);
      }
    });
  });

     //////// REQUETE 9 //////

  app.put('/tinyint/:id', (req, res) => {
    const idDev = req.params.id;
    // TODO récupération des données (étape 2)*
    connection.query('UPDATE SuperDev SET gender = !gender WHERE id=?', idDev, err => {
          // TODO envoyer les données récupérées (étape 3)
      if (err) {
        console.log(err);
        res.status(500).send('Erreur lors de la modif du dev');
      } else {
        res.sendStatus(200);
      }
    });
  });

    //////// REQUETE 10 //////


  app.delete('/birthday/:id', (req, res) => {
    // récupération des données envoyées
  const idDev = req.params.id;
    // connexion à la base de données, et suppression de l'employé
  connection.query('DELETE birthday FROM SuperDev WHERE id = ?', idDev, err => {
    if (err) {
        // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      console.log(err);
      res.status(500).send("Erreur lors de la suppression d'un birthday");
    } else {
      res.sendStatus(200);
    }
  });
});

    //////// REQUETE 11 //////

  app.delete('/:id', (req, res) => {
      // récupération des données envoyées
    const idMovie = req.params.id;
      // connexion à la base de données, et suppression de l'employé
    connection.query('DELETE FROM SuperDev WHERE id = ?', idMovie, err => {
      if (err) {
          // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
        console.log(err);
        res.status(500).send("Erreur lors de la suppression d'un dev");
      } else {
        res.sendStatus(200);
      }
    });
  });

app.listen(port, (err) => {
    if (err) {
      throw new Error('Something bad happened...');
    }
  
    console.log(`Server is listening on ${port}`);
  });