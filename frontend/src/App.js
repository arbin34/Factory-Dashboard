import React, { useEffect, useState } from "react";
import { getDashboard } from "./services/api";
import FactorySummary from "./components/FactorySummary";
import WorkerTable from "./components/WorkerTable";
import WorkstationTable from "./components/WorkstationTable";

// Simple CSS-in-JS styles
const styles = {
  container: {
    padding: "2rem",
    fontFamily: "'Roboto', sans-serif",
    backgroundColor: "#f4f6f8",
    minHeight: "100vh",
  },
  header: {
    textAlign: "center",
    marginBottom: "2rem",
    color: "#2c3e50",
    fontSize: "2.2rem",
    fontWeight: "700",
  },
  section: {
    marginBottom: "2rem",
  },
  cardsContainer: {
    display: "flex",
    gap: "1.5rem",
    flexWrap: "wrap",
    marginBottom: "2rem",
  },
  card: {
    flex: "1 1 200px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "1.5rem",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    textAlign: "center",
  },
  cardTitle: {
    fontSize: "1rem",
    color: "#7f8c8d",
    marginBottom: "0.5rem",
  },
  cardValue: {
    fontSize: "1.8rem",
    fontWeight: "700",
    color: "#2980b9",
  },
  tableSection: {
    backgroundColor: "#fff",
    padding: "1.5rem",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  },
  tableHeader: {
    marginBottom: "1rem",
    fontSize: "1.3rem",
    fontWeight: "600",
    color: "#34495e",
  },
  loading: {
    textAlign: "center",
    marginTop: "10rem",
    fontSize: "1.5rem",
    color: "#7f8c8d",
  },
};

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getDashboard()
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!data) return <h2 style={styles.loading}>Loading Dashboard...</h2>;

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Factory Productivity Dashboard</h1>

      {/* Factory Summary Cards */}
      <div style={styles.cardsContainer}>
        <div style={styles.card}>
          <div style={styles.cardTitle}>Total Production</div>
          <div style={styles.cardValue}>{data.factory?.total_production || 0}</div>
        </div>
        <div style={styles.card}>
          <div style={styles.cardTitle}>Active Workers</div>
          <div style={styles.cardValue}>{data.workers?.length || 0}</div>
        </div>
        <div style={styles.card}>
          <div style={styles.cardTitle}>Workstations</div>
          <div style={styles.cardValue}>{data.workstations?.length || 0}</div>
        </div>
      </div>

      {/* Worker Table */}
      <div style={styles.section}>
        <div style={styles.tableSection}>
          <h2 style={styles.tableHeader}>Worker Details</h2>
          <WorkerTable workers={data.workers} />
        </div>
      </div>

      {/* Workstation Table */}
      <div style={styles.section}>
        <div style={styles.tableSection}>
          <h2 style={styles.tableHeader}>Workstation Details</h2>
          <WorkstationTable stations={data.workstations} />
        </div>
      </div>
    </div>
  );
}

export default App;
