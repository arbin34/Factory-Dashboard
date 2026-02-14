const db = require("./database");

function seedDatabase() {
  db.serialize(() => {
    db.run("DELETE FROM workers");
    db.run("DELETE FROM workstations");
    db.run("DELETE FROM events");

    // Workers
    for (let i = 1; i <= 6; i++) {
      db.run(
        "INSERT INTO workers (worker_id, name) VALUES (?, ?)",
        [`W${i}`, `Worker ${i}`]
      );
    }

    // Workstations
    for (let i = 1; i <= 6; i++) {
      db.run(
        "INSERT INTO workstations (station_id, name, type) VALUES (?, ?, ?)",
        [`S${i}`, `Station ${i}`, "Assembly"]
      );
    }

    const now = new Date();

    // Events
    for (let w = 1; w <= 6; w++) {
      for (let i = 0; i < 8; i++) {
        const time = new Date(now - i * 3600000).toISOString();

        db.run(
          `INSERT INTO events 
           (timestamp, worker_id, workstation_id, event_type, confidence, count)
           VALUES (?, ?, ?, ?, ?, ?)`,
          [
            time,
            `W${w}`,
            "S1",
            i % 2 === 0 ? "working" : "idle",
            0.95,
            0
          ]
        );

        if (i % 2 === 0) {
          db.run(
            `INSERT INTO events 
             (timestamp, worker_id, workstation_id, event_type, confidence, count)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [time, `W${w}`, "S1", "product_count", 1, 5]
          );
        }
      }
    }
  });
}

module.exports = seedDatabase;
