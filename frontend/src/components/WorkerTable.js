export default function WorkerTable({ workers }) {
  return (
    <>
      <h2>Workers</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Name</th>
            <th>Active</th>
            <th>Idle</th>
            <th>Utilization</th>
            <th>Units</th>
            <th>Units/hr</th>
          </tr>
        </thead>
        <tbody>
          {workers.map(w => (
            <tr key={w.worker_id}>
              <td>{w.name}</td>
              <td>{w.active_time}</td>
              <td>{w.idle_time}</td>
              <td>{w.utilization}%</td>
              <td>{w.units}</td>
              <td>{w.units_per_hour}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
