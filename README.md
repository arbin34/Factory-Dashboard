
- **Edge → Backend → Dashboard** architecture ensures that AI events are processed centrally and metrics are computed for visualization.  
- Backend exposes REST APIs for event ingestion and fetching computed metrics.  
- Frontend uses **React + Axios** to fetch data and display it in tables/cards.  

---

## Database Schema

The backend database stores:

### Workers Table
| Field      | Type   | Description          |
|------------|--------|--------------------|
| worker_id  | TEXT   | Unique worker ID    |
| name       | TEXT   | Worker name         |

### Workstations Table
| Field        | Type   | Description           |
|--------------|--------|---------------------|
| station_id   | TEXT   | Unique workstation ID|
| name/type    | TEXT   | Workstation name/type|

### Events Table
| Field          | Type      | Description                                      |
|----------------|-----------|--------------------------------------------------|
| timestamp      | DATETIME  | Event timestamp in UTC                            |
| worker_id      | TEXT      | Worker performing the event                       |
| workstation_id | TEXT      | Workstation involved                             |
| event_type     | TEXT      | Type of event (`working`, `idle`, `absent`, `product_count`) |
| confidence     | REAL      | Confidence score from AI model                   |
| count          | INTEGER   | Number of units produced (only for `product_count`) |

---

## Metrics Definitions

### Worker-Level
- **Total active time:** Sum of time intervals where worker is `working`.  
- **Total idle time:** Sum of time intervals where worker is `idle`.  
- **Utilization %:** `(Total active time) / (Total active + idle time) * 100`.  
- **Total units produced:** Sum of `count` from `product_count` events.  
- **Units per hour:** `Total units / Active hours`.

### Workstation-Level
- **Occupancy time:** Sum of time when workstation is in use.  
- **Utilization %:** `(Occupancy time / Shift time) * 100`.  
- **Total units produced:** Sum of `count` for products handled at that workstation.  
- **Throughput rate:** Units produced per hour.  

### Factory-Level
- **Total productive time:** Sum of all workers’ active time.  
- **Total production count:** Sum of all product_count events.  
- **Average production rate:** `Total units / Total active time`.  
- **Average utilization:** Mean utilization across all workers.  

**Assumptions:**  
- Events are processed in order of timestamps; out-of-order events are reordered.  
- Duplicate events are filtered by checking timestamp + worker_id + workstation_id + event_type.  
- Time differences between events are used to calculate intervals (active/idle).  

---

## Frontend Dashboard

- **Factory Summary Cards:** Shows total production, active workers, workstations.  
- **Worker Table:** Displays each worker’s metrics.  
- **Workstation Table:** Displays each workstation’s metrics.  
- **Filter/Selection:** Can filter by worker or workstation.  
- Built using **React**, with optional styling using CSS-in-JS or Tailwind.  

---

## Backend API

- `POST /api/events` → Ingest AI event JSONs.  
- `GET /api/dashboard` → Fetch computed metrics for frontend.  
- Backend validates events and updates the database.  
- Pre-populated dummy data allows the dashboard to load meaningful metrics on first run.  

**Example Event JSON:**

```json
{
  "timestamp": "2026-01-15T10:15:00Z",
  "worker_id": "W1",
  "workstation_id": "S3",
  "event_type": "working",
  "confidence": 0.93,
  "count": 1
}
