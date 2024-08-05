import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-post-project',
  templateUrl: './post-project.component.html',
  styleUrl: './post-project.component.scss'
})
export class PostProjectComponent {

  projectForm!: FormGroup;
  listOfEmployees: any = [];
  listOfPriorities: any = ["LOW", "MEDIUM", "HIGH"];

  constructor(private adminService:AdminService,
    private fb: FormBuilder,
    private snackBar:MatSnackBar,
    private router:Router
  ) { 
    this.getUsers();
    this.projectForm = this.fb.group({
      employeeId:[null,[Validators.required]],
      title:[null,[Validators.required]],
      description:[null,[Validators.required]],
      dueDate:[null,[Validators.required]],
      priority:[null,[Validators.required]],
    })
  }

  getUsers(){
    this.adminService.getUsers().subscribe((res)=>{
      this.listOfEmployees = res;
      console.log(res);
    })
  }

  postProject(){
    console.log(this.projectForm.value);
    this.adminService.postProject(this.projectForm.value).subscribe((res)=>{
      if(res.id !=null){
          this.snackBar.open("Project posted successfully","Close",{duration:5000});
          this.router.navigateByUrl("/admin/dashboard");
      } else{
        this.snackBar.open("Something went wrong","ERROR",{duration:5000});
      }
    })
  }
}
