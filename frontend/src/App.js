import React, { useEffect, useState } from "react";
import { getDashboard } from "./services/api";
import FactorySummary from "./components/FactorySummary";
import WorkerTable from "./components/WorkerTable";
import WorkstationTable from "./components/WorkstationTable";

function App() {

  const [data, setData] = useState(null);

  useEffect(() => {
    getDashboard().then(res =>
      setData(res.data)
    );
  }, []);

  if (!data) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: 40 }}>
      <h1>Factory Productivity Dashboard</h1>

      <FactorySummary factory={data.factory} />

      <WorkerTable workers={data.workers} />

      <WorkstationTable stations={data.workstations} />
    </div>
  );
}

export default App;
