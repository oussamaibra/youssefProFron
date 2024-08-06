import { Component, HostListener, OnInit } from '@angular/core';
import { ChartType, ChartDataset, ChartOptions } from 'chart.js';
import { EmployeeService } from '../../services/employee.service';
import Chart from 'chart.js/auto';
import { Task } from '../../Models/task';
import { StorageService } from '../../../../auth/services/storage/storage.service';

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
  chart: any = [];
  chart2: any = [];

  tasks: any = 0;
  inprogress: any = 0;
  done: any = 0;
  total: any = 0;

  perfer: any = 0;

  low: any = 0;
  high: any = 0;
  medium: any = 0;

  projects: any = [];

  isEditEnabled: boolean = false;
  updatedTask: Task | any;
  currentUser: any;

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

  getTasksByuser_id(id: number) {
    this.service.getTasksByUserId(id).subscribe((res) => {
      this.total = res?.length;

      this.tasks = res
        .filter((el: any) => el?.type === 'todo')
        .map((el: any) => ({
          ID: el.id,
          Title: el?.title,
          user_id: el?.user_id,
          Description: el?.description,
          id: el?.id ?? 0,
          Type: 'todo',
        })).length;

      this.inprogress = res
        .filter((el: any) => el?.type === 'inprogress')
        .map((el: any) => ({
          ID: el.id,
          Title: el?.title,
          user_id: el?.user_id,
          Description: el?.description,
          id: el?.id ?? 0,
          Type: 'inprogress',
        })).length;

      this.done = res
        .filter((el: any) => el?.type === 'done')
        .map((el: any) => ({
          ID: el.id,
          Title: el?.title,
          user_id: el?.user_id,
          Description: el?.description,
          id: el?.id ?? 0,
          Type: 'done',
        })).length;


      this.perfer = (this?.done / res?.length) * 100;

      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: ['Completed', 'Pending', 'To Do'],
          datasets: [
            {
              label: 'Stat of Task Progress',
              data: [this.done ?? 0, this.inprogress ?? 0, this.tasks ?? 0],
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(75, 192, 192)',
                'rgb(255, 205, 86)',
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    });
  }

  getProjectByuser_id(id: number) {
    this.service.getEmployeeProjectsById().subscribe((res) => {
      this.projects = res;

      this.low = res.filter((el: any) => el?.priority === 'LOW').length;

      console.log('ssssssssssssssssssssssssss', this.low);

      this.high = res.filter((el: any) => el?.priority === 'HIGH').length;

      this.medium = res.filter((el: any) => el?.priority === 'MEDIUM').length;

      this.chart2 = new Chart('canvas2', {
        type: 'line',
        data: {
          labels: ['LOW', 'MEDIUM', 'HIGH'],
          datasets: [
            {
              label: 'Stat of Project Priorities',
              data: [this.low, this.medium, this.high],
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(75, 192, 192)',
                'rgb(255, 205, 86)',
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    });
  }

  ngOnInit(): void {
    this.currentUser = StorageService.getUser();

    this.getProjectByuser_id(
      StorageService.getUser()?.id ? Number(StorageService.getUser()?.id) : 0
    );

    this.getTasksByuser_id(
      StorageService.getUser()?.id ? Number(StorageService.getUser()?.id) : 0
    );

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
