import { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { StatisticsService } from '../../../services/statistics.service';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

export default function AdminDashboard() {
  const [totalHours, setTotalHours] = useState(0);
  const [barData, setBarData] = useState<any>({ labels: [], datasets: [] });
  const [pieData, setPieData] = useState<any>({ labels: [], datasets: [] });

  useEffect(() => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 30);

    StatisticsService.getTotalHours(start, end).then(setTotalHours);
    
    StatisticsService.getTopEmployees(start, end).then(data => {
      setBarData({
        labels: data.map(d => d.employeeName),
        datasets: [{ label: 'Hours', data: data.map(d => d.totalHours), backgroundColor: '#3b82f6' }]
      });
    });

    StatisticsService.getShiftsPerDay().then(data => {
      setPieData({
        labels: data.map(d => d.dayOfWeek),
        datasets: [{ data: data.map(d => d.count), backgroundColor: ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#6b7280'] }]
      });
    });
  }, []);

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Dashboard</h2>
        <span className="text-muted small">Last 30 days statistics</span>
      </div>

      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-3">
            <div className="text-muted mb-1">Total Hours Worked</div>
            <h2 className="fw-bold text-primary">{totalHours} h</h2>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card border-0 shadow-sm p-4">
            <h5 className="mb-4">Top 5 Employees</h5>
            <div style={{ height: '250px' }}>
              <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card border-0 shadow-sm p-4">
            <h5 className="mb-4">Shifts per Day</h5>
            <div style={{ height: '250px' }}>
              <Doughnut data={pieData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}