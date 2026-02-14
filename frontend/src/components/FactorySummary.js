export default function FactorySummary({ factory }) {
  return (
    <>
      <h2>Factory Summary</h2>
      <p>Total Production: {factory.total_production}</p>
      <p>Total Active Time: {factory.total_active_time} hrs</p>
      <p>Average Utilization: {factory.average_utilization}%</p>
    </>
  );
}
