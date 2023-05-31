const express = require("express");
const conn = require("../database/index.js");
const clientRouter = express.Router();
require("dotenv").config();

clientRouter.post("/addclient", (req, res) => {
  const data = req.body;
  console.log(data);
  const sql = `INSERT INTO clients (clientId,clientFirstName, clientLastName,clientCity, clientAddress, clientEmail, clientPhone, clientDateOfBirth,ClientImgUrl)
    VALUES (?, ?, ?, ?, ?, ?,?,?,?);`;
  conn.query(
    sql,
    [
      data.clientId,
      data.clientFirstName,
      data.clientLastName,
      data.clientCity,
      data.clientAddress,
      data.clientEmail,
      data.clientPhone,
      data.clientDateOfBirth,
      data.ClientImgUrl,
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

clientRouter.get("/getallclients", (req, res) => {
  const sql = `SELECT * FROM clients;`;
  conn.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    }
    res.status(200).json(results);
  });
});

clientRouter.get("/getclient/:id", (req, res) => {
  const id = req.params.id;
  const sql = `SELECT *  FROM clients WHERE clientId = ?;`;
  conn.query(sql, [id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    }
    res.status(200).json(results);
  });
});

clientRouter.put("/updateclient/:id", (req, res) => {
  const id = req.params.id;
  const clientData = req.body;

  const sql = `UPDATE craftseeker.clients SET ? WHERE clientId = ?`;
  conn.query(sql, [clientData, id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    }
    res.status(200).json(results);
  });
});

clientRouter.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM clients
    WHERE clientId = ?;`;
  conn.query(sql, [id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    }
    res.status(200).json(results);
  });
});

module.exports = clientRouter;
