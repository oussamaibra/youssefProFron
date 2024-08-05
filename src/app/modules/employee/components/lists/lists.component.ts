import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.scss'
})
export class ListsComponent {

  listOfProjects: any = [];

  constructor(private service: EmployeeService){
    this.getProjects();
  }

  getProjects(){
    this.service.getEmployeeProjectsById().subscribe((res)=> {
      console.log(res);
      this.listOfProjects = res;

    })

  }
}
