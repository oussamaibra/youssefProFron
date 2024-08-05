import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { Task } from '../../Models/task';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


interface SideNavToggle {
  screenwidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',  

})
export class ProductsComponent implements OnInit {

  todoForm! : FormGroup;
  tasks: Task[] = [];
  inprogress:Task[] = [];
  done:Task[] = [];

  isEditEnabled: boolean = false;
  updatedIndex:any;

  innerWidth: any;

  constructor(private fb:FormBuilder){ }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.todoForm = this.fb.group({
      item : ['', Validators.required]
    });
  }

  addTask(){
    this.tasks.push({
      Title : this.todoForm.value.item,
      Completed:false
    });
    this.todoForm.reset();

  }

  updateTask()
  {
    this.tasks[this.updatedIndex].Title = this.todoForm.value.item;
    this.tasks[this.updatedIndex].Completed = false;
    this.todoForm.reset();
    this.updatedIndex = undefined;
    this.isEditEnabled = false;

  }

  deleteTask(taskId:number)
  {
    this.tasks.splice(taskId,1);

  }
  deleteInprogressTask(taskId:number)
  {
    this.inprogress.splice(taskId,1);

  }
  deleteDoneTask(taskId:number)
  {
    this.done.splice(taskId,1);

  }

  onEditTask(task:Task,TaskId:number)
  {
    this.todoForm.controls['item'].setValue(task.Title);
    this.updatedIndex = TaskId;
    this.isEditEnabled = true;    

  }

  

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }

  getClass() {
    return this.innerWidth < 925 ? 'row-md' : 'row';
  }

  isSideNavCollapsed = false;
  screenWidth = 0;

 
  onToggleSideNav(eventData: SideNavToggle) {
    this.screenWidth = eventData.screenwidth;
    this.isSideNavCollapsed = eventData.collapsed;
    // Logique de gestion de l'ouverture/fermeture du menu latéral
    // Vous pouvez utiliser eventData.screenwidth et eventData.collapsed ici
  }

}
