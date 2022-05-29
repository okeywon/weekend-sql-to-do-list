const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

router.get("/", (req, res) => {
    let sqlQuery = `
      SELECT * FROM todo
      ORDER BY task ASC;
      `;
    pool
      .query(sqlQuery)
      .then((response) => {
        console.log(response.rows);
        res.send(response.rows);
      })
      .catch((err) => {
        console.log("error router side GET", err);
        res.sendStatus(500);
      });
  });
  
  // POST
  router.post('/', (req,res) => {
      let newTask = req.body;
      console.log('Adding newTask:', newTask);
  
      let queryText = `INSERT INTO "todo"
          ("task", "description", "due", "isComplete")
              VALUES ($1, $2, $3, $4);`;
      pool.query(queryText, [newTask.task, newTask.description, newTask.due, newTask.isComplete])
          .then(result => {
              res.sendStatus(201);
          })
          .catch(error => {
              console.log('Error on router side POST', error);
              res.sendStatus(500);
          });
  });
  
  
  router.put('/:id', (req, res) => {
    console.log('updating task list', req.params.id, req.body.isComplete);
    let taskId = req.params.id;
  
    const sqlQuery = `
    UPDATE "todo"
    SET "isComplete" = $2
    WHERE id = $1;
    `;
  
    const sqlParams = [
        taskId, // $1
        req.body.complete // $2, 
    ]
  
    pool.query(sqlQuery, sqlParams)
        .then(() => {
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log(`PUT to db failed: ${err}`);
            res.sendStatus(500);
        });
  });
  
  router.delete('/:id', (req,res ) => {
      let taskId = req.params.id
      console.log('In Delete', taskId);
      const sqlQuery = `
          DELETE FROM "todo"
          WHERE "id" = $1;
          `;
      const sqlParams = [
          taskId,
      ];
  
      pool.query(sqlQuery,sqlParams)
          .then(() => {
              console.log('DELETE successful');
              res.sendStatus(204)
          })
          .catch((err) => {
              console.log(`DELETE failed router side ${err}`);
              res.sendStatus(500);
          })
  })

module.exports = router;