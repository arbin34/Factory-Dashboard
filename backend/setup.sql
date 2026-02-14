

CREATE TABLE workers (
    worker_id TEXT PRIMARY KEY,
    name TEXT
);

CREATE TABLE workstations (
    workstation_id TEXT PRIMARY KEY,
    name TEXT,
    type TEXT
);

CREATE TABLE events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp TEXT,
    worker_id TEXT,
    workstation_id TEXT,
    event_type TEXT,
    confidence REAL,
    count INTEGER DEFAULT 0
);

INSERT INTO workers VALUES ('W1','Amit');
INSERT INTO workers VALUES ('W2','Ravi');
INSERT INTO workers VALUES ('W3','Neha');
INSERT INTO workers VALUES ('W4','Suman');
INSERT INTO workers VALUES ('W5','Rahul');
INSERT INTO workers VALUES ('W6','Priya');

INSERT INTO workstations VALUES ('S1','Assembly Line 1','Assembly');
INSERT INTO workstations VALUES ('S2','Assembly Line 2','Assembly');
INSERT INTO workstations VALUES ('S3','Packaging 1','Packaging');
INSERT INTO workstations VALUES ('S4','Packaging 2','Packaging');
INSERT INTO workstations VALUES ('S5','Inspection 1','Inspection');
INSERT INTO workstations VALUES ('S6','Inspection 2','Inspection');

INSERT INTO events (timestamp, worker_id, workstation_id, event_type, confidence, count)
VALUES
('2026-01-15T09:00:00Z','W1','S1','working',0.95,0),
('2026-01-15T09:10:00Z','W1','S1','product_count',0.99,5),
('2026-01-15T09:20:00Z','W1','S1','idle',0.90,0),
('2026-01-15T09:00:00Z','W2','S2','working',0.93,0),
('2026-01-15T09:15:00Z','W2','S2','product_count',0.98,3),
('2026-01-15T09:30:00Z','W2','S2','working',0.94,0);
