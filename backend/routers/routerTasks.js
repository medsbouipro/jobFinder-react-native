const express = require("express");
const taskRouter = express.Router();
const conn = require("../database/index.js");

taskRouter.get("/getalltasks", (req, res) => {
  const sql = `SELECT * FROM tasks;`;
  conn.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    }
    res.status(200).json(results);
  });
});

taskRouter.post("/addtask", (req, res) => {
  const {
    clients_clientId,
    workers_workerId,
    taskWorker,
    taskTitle,
    taskText,
    taskStatus,
  } = req.body;
  const taskDate = new Date().toISOString().slice(0, 19).replace("T", " ");
  const sql = `INSERT INTO tasks (clients_clientId, workers_workerId, taskWorker,taskTitle, taskText, taskDate,taskStatus)
    VALUES (?,?, ?,?, ?,?,?);`;
  conn.query(
    sql,
    [
      clients_clientId,
      workers_workerId,
      taskWorker,
      taskTitle,
      taskText,
      taskDate,
      taskStatus,
    ],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).json(err);
      }
      res.status(200).json(results);
    }
  );
});

taskRouter.get("/getclienttasks/:id", (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM tasks WHERE clients_clientId = ?;`;
  conn.query(sql, [id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    }
    res.status(200).json(results);
  });
});

taskRouter.get("/getworkertasks/:id", (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM tasks WHERE workers_workerId = ?;`;
  conn.query(sql, [id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    }
    res.status(200).json(results);
  });
});

// taskRouter.get("/getworkeroffers/:workerId", (req, res) => {
//   const { workerId } = req.params;
//   const sql = `SELECT tasks.taskId, tasks.taskTitle, tasks.taskText, clients.clientId, clients.clientFirstName, clients.clientLastName
//     FROM tasks
//     INNER JOIN clients ON clients.clientId = tasks.clients_clientId
//     WHERE tasks.workers_workerId = ? AND tasks.taskStatus = 'Pending';
//     `;
//   conn.query(sql, [workerId], (err, results) => {
//     if (err) {
//       console.log(err);
//       res.status(500).json(err);
//     }
//     console.log(results);
//     res.status(200).json(results);
//   });
// });

// taskRouter.put('/changetaskstatus/:id',(req,res)=>{
//     const id = req.params.id
//     const taskStatus = req.body.taskStatus
//     const sql=`UPDATE tasks
//               SET taskStatus = ?
//               WHERE taskId = ? ;`
//     conn.query(sql,[taskStatus,id],(err,results)=>{
//         if(err){
//             console.log(err)
//             res.status(500).json(err)
//         }
//         console.log(results)
//         res.status(200).json(results)
//     })
// })

taskRouter.put("/updatetask/:id", (req, res) => {
  const id = req.params.id;
  const updateFields = req.body;

  const sql = `UPDATE tasks SET ? WHERE taskId = ?`;

  conn.query(sql, [updateFields, id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    }
    res.status(200).json(results);
  });
});

taskRouter.get("/getonetask/:id", (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM tasks where taskId = ?;`;
  conn.query(sql, [id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    }
    res.status(200).json(results);
  });
});

taskRouter.delete("/deletetask/:id", (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM tasks WHERE taskId = ?;`;
  conn.query(sql, [id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    }
    res.status(200).json(results);
  });
});

module.exports = taskRouter;
