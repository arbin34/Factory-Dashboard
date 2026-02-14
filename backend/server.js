const express = require("express");
//const cors = require("cors");
const db = require("./database");
const computeMetrics = require("./metrics");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ================= EVENT INGESTION =================

app.post("/api/events", (req, res) => {
  const {
    timestamp,
    worker_id,
    workstation_id,
    event_type,
    confidence,
    count
  } = req.body;

  db.run(
    `INSERT INTO events
    (timestamp, worker_id, workstation_id, event_type, confidence, count)
    VALUES (?, ?, ?, ?, ?, ?)`,
    [timestamp, worker_id, workstation_id, event_type, confidence, count],
    function (err) {
      if (err) return res.status(500).json(err);
      res.json({ message: "Event stored", id: this.lastID });
    }
  );
});

// ================= DASHBOARD =================

app.get("/api/dashboard", (req, res) => {

  db.all("SELECT * FROM workers", [], (err, workers) => {
    if (err) {
      console.error("Workers error:", err);
      return res.status(500).json({ error: "Workers fetch failed" });
    }

    db.all("SELECT * FROM workstations", [], (err2, stations) => {
      if (err2) {
        console.error("Stations error:", err2);
        return res.status(500).json({ error: "Stations fetch failed" });
      }

      db.all("SELECT * FROM events ORDER BY timestamp ASC", [], (err3, events) => {
        if (err3) {
          console.error("Events error:", err3);
          return res.status(500).json({ error: "Events fetch failed" });
        }

        if (!workers) workers = [];
        if (!stations) stations = [];
        if (!events) events = [];

        const result = computeMetrics(workers, stations, events);
        res.json(result);
      });

    });
  });

});


app.listen(5000, () =>
  console.log("Server running at http://localhost:5000")
);
