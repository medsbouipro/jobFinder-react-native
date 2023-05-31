const express = require("express");
const conn = require("../database/index.js");
const workerRouter = express.Router();
require("dotenv").config();
const bcrypt = require("bcrypt");
const { authenticateToken } = require("../middlewares/jwt.js");
const jwt = require("jsonwebtoken");

workerRouter.post("/addworker", (req, res) => {
  const {
    workerId,
    workerFirstName,
    workerLastName,
    workerAddress,
    workerEmail,
    workerCategory,
    workerDateOfBirth,
    workerPhoneNumber,
    workerNumberOfJobs,
    workerAvailability,
    workerJob,
    workerProfessionalSummary,
    workerTotalRating,
    workerBio,
    workerNumRates,
    workerCity,
    workerImgUrl,
    workerYearsOfExperience,
  } = req.body;

  const sql = `INSERT INTO craftseeker.workers (
      workerId,
      workerFirstName,
      workerLastName,
      workerAddress,
      workerEmail,
      workerCategory,
      workerDateOfBirth,
      workerPhoneNumber,
      workerNumberOfJobs,
      workerAvailability,
      workerJob,
      workerProfessionalSummary,
      workerTotalRating,
      workerBio,
      workerNumRates,
      workerCity,
      workerImgUrl,
      workerYearsOfExperience
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

  conn.query(
    sql,
    [
      workerId,
      workerFirstName,
      workerLastName,
      workerAddress,
      workerEmail,
      workerCategory,
      workerDateOfBirth,
      workerPhoneNumber,
      workerNumberOfJobs,
      workerAvailability,
      workerJob,
      workerProfessionalSummary,
      workerTotalRating,
      workerBio,
      workerNumRates,
      workerCity,
      workerImgUrl,
      workerYearsOfExperience,
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

workerRouter.get("/getallworkers", (req, res) => {
  const sql = `SELECT * FROM workers;`;
  conn.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    }
    res.status(200).json(results);
  });
});

workerRouter.put("/updateworker/:id", (req, res) => {
    const id = req.params.id;
    const workerData = req.body;
    
    const sql = `UPDATE craftseeker.workers SET ? WHERE workerId = ?`;
  
    conn.query(
      sql,
      [workerData, id],
      (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).json(err);
        }
        res.status(200).json(results);
      }
    );
  });
  
workerRouter.delete("/deleteWorker/:id", (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM workers WHERE workerId = ?`;
  conn.query(sql, [id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    }
    res.status(200).json(results);
  });
});


workerRouter.get("/getworker/:id", (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM workers WHERE workerId = ?;`;
  conn.query(sql, [id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    }
    res.status(200).json(results);
  });
});

module.exports = workerRouter;
