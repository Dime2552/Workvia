import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { StatisticsService } from '../../../../core/services/statistics';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  totalHours: number = 0;
  
  // Bar Chart (Top Employees)
  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
  };
  public topEmployeesChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [{ data: [], label: 'Hours Worked', backgroundColor: '#0d6efd' }]
  };

  // Pie/Doughnut Chart (Shifts per Day)
  public pieChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
  };
  public shiftsPerDayChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: [],
    datasets: [{ 
      data: [], 
      backgroundColor: [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#C9CBCF'
      ] 
    }]
  };

  constructor(private statsService: StatisticsService) {}

  ngOnInit(): void {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 30);

    this.loadTotalHours(startDate, endDate);
    this.loadTopEmployees(startDate, endDate);
    this.loadShiftsPerDay();
  }

  loadTotalHours(start: Date, end: Date) {
    this.statsService.getTotalHours(start, end).subscribe({
      next: (val) => this.totalHours = val,
      error: (err) => console.error(err)
    });
  }

  loadTopEmployees(start: Date, end: Date) {
    this.statsService.getTopEmployees(start, end).subscribe({
      next: (data) => {
        this.topEmployeesChartData = {
          labels: data.map(x => x.employeeName),
          datasets: [{ 
            data: data.map(x => x.totalHours), 
            label: 'Hours Worked', 
            backgroundColor: '#0d6efd' 
          }]
        };
      },
      error: (err) => console.error(err)
    });
  }

  loadShiftsPerDay() {
    this.statsService.getShiftsPerDay().subscribe({
      next: (data) => {
        this.shiftsPerDayChartData = {
          labels: data.map(x => x.dayOfWeek),
          datasets: [{ 
            data: data.map(x => x.count),
            backgroundColor: [
                '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#C9CBCF'
            ]
          }]
        };
      },
      error: (err) => console.error(err)
    });
  }
}