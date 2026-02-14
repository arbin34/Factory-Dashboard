function computeMetrics(workers = [], stations = [], events = []) 
 {

  const workerMetrics = {};
  const stationMetrics = {};
  let totalProduction = 0;
  let totalActiveTime = 0;

  // Initialize workers
  workers.forEach(w => {
    workerMetrics[w.worker_id] = {
      name: w.name,
      active: 0,
      idle: 0,
      units: 0
    };
  });

  // Initialize stations
  stations.forEach(s => {
    stationMetrics[s.workstation_id] = {
      name: s.name,
      occupancy: 0,
      units: 0
    };
  });

  // Assumption:
  // Duration of state = time difference between consecutive events
  for (let i = 0; i < events.length - 1; i++) {
    const curr = events[i];
    const next = events[i + 1];

    const diffHours =
      (new Date(next.timestamp) - new Date(curr.timestamp)) / 3600000;

    if (curr.event_type === "working") {
      workerMetrics[curr.worker_id].active += diffHours;
      stationMetrics[curr.workstation_id].occupancy += diffHours;
      totalActiveTime += diffHours;
    }

    if (curr.event_type === "idle") {
      workerMetrics[curr.worker_id].idle += diffHours;
    }

    if (curr.event_type === "product_count") {
      workerMetrics[curr.worker_id].units += curr.count;
      stationMetrics[curr.workstation_id].units += curr.count;
      totalProduction += curr.count;
    }
  }

  const workersResult = Object.keys(workerMetrics).map(id => {
    const w = workerMetrics[id];
    const totalTime = w.active + w.idle;
    const utilization = totalTime
      ? (w.active / totalTime) * 100
      : 0;

    return {
      worker_id: id,
      name: w.name,
      active_time: w.active.toFixed(2),
      idle_time: w.idle.toFixed(2),
      utilization: utilization.toFixed(2),
      units: w.units,
      units_per_hour: w.active
        ? (w.units / w.active).toFixed(2)
        : 0
    };
  });

  const stationsResult = Object.keys(stationMetrics).map(id => {
    const s = stationMetrics[id];

    return {
      workstation_id: id,
      name: s.name,
      occupancy_time: s.occupancy.toFixed(2),
      units: s.units,
      throughput: s.occupancy
        ? (s.units / s.occupancy).toFixed(2)
        : 0
    };
  });

  const avgUtil =
    workersResult.reduce(
      (sum, w) => sum + parseFloat(w.utilization),
      0
    ) / workersResult.length;

  return {
    factory: {
      total_production: totalProduction,
      total_active_time: totalActiveTime.toFixed(2),
      average_utilization: avgUtil.toFixed(2)
    },
    workers: workersResult,
    workstations: stationsResult
  };
}

module.exports = computeMetrics;
