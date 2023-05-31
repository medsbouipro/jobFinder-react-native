const express = require("express");
const reviewRouter = express.Router();
const conn = require("../database/index.js");

reviewRouter.post("/addreview", (req, res) => {
  const {
    clients_clientId,
    workers_workerId,
    reviewText,
    reviewRating,
    reviewOwner,
    reviewUrl
  } = req.body;
  const reviewDate = new Date().toISOString().slice(0, 19).replace("T", " ");
  const sql = `INSERT INTO reviews (clients_clientId, workers_workerId, reviewText, reviewDate, reviewRating,reviewOwner,reviewUrl)
                 VALUES (?, ?, ?, ?, ?,?,?);`;
  conn.query(
    sql,
    [
      clients_clientId,
      workers_workerId,
      reviewText,
      reviewDate,
      reviewRating,
      reviewOwner,
      reviewUrl,
    ],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).json(err);
      } else {
        console.log(results);
        res.status(200).json(results);
        
      }
    }
  );
});

reviewRouter.get("/getallreviews", (req, res) => {
  const sql = `SELECT * FROM reviews`;
  conn.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    }
    res.status(200).json(results);
  });
});
reviewRouter.delete("/deleteonereview/:rId", (req, res) => {
  const { rId } = req.params;
  const sql = `DELETE FROM reviews WHERE reviewId = ? ;`;
  conn.query(sql, [rId], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    }
    res.status(200).json(results);
  });
});
reviewRouter.put("/updatereview/:rId", (req, res) => {
  const { rId } = req.params;
  const { reviewText } = req.body;
  const sql = `UPDATE reviews SET reviewText = ? WHERE reviewId = ?;`;
  conn.query(sql, [reviewText, rId], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    }
    res.status(200).json(results);
  });
});

reviewRouter.get("/getreview/:id", (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM reviews where workers_workerId = ?;`;
  conn.query(sql, [id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    }
    res.status(200).json(results);
  });
});

module.exports = reviewRouter;
