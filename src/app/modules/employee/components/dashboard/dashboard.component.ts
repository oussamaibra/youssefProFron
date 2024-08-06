import { Component, HostListener, OnInit } from '@angular/core';
import { ChartType, ChartDataset, ChartOptions } from 'chart.js';
import { EmployeeService } from '../../services/employee.service';

interface SideNavToggle {
  screenwidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  innerWidth: any;
  isSideNavCollapsed = false;
  screenWidth = 0;
  user: any;
  id: string = '1';

  public doughnutChartLabels: string[] = ['To Do', 'In Progress', 'Done'];
  public doughnutChartData: ChartDataset[] = [
    { data: [10, 450, 100], label: 'Series A' },
    { data: [50, 150, 120], label: 'Series B' },
    { data: [250, 130, 70], label: 'Series C' },
  ];
  public doughnutChartType: ChartType = 'doughnut';

  constructor(private service: EmployeeService) {
    this.getUser();
  }

  getUser() {
    this.service.getEmployeById(this.id).subscribe((res) => {
      this.user = res;
    });
  }

  ngOnInit(): void {
    this.innerWidth = window?.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window?.innerWidth;
  }

  getClass() {
    return this.innerWidth < 925 ? 'row-md' : 'row';
  }

  onToggleSideNav(eventData: SideNavToggle) {
    this.screenWidth = eventData.screenwidth;
    this.isSideNavCollapsed = eventData.collapsed;
  }
}
