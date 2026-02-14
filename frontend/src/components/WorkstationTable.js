export default function WorkstationTable({ stations }) {
  return (
    <>
      <h2>Workstations</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Name</th>
            <th>Occupancy</th>
            <th>Units</th>
            <th>Throughput</th>
          </tr>
        </thead>
        <tbody>
          {stations.map(s => (
            <tr key={s.workstation_id}>
              <td>{s.name}</td>
              <td>{s.occupancy_time}</td>
              <td>{s.units}</td>
              <td>{s.throughput}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
