import { Component, HostListener, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { Task } from '../../Models/task';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { StorageService } from '../../../../auth/services/storage/storage.service';
import { EmployeeService } from '../../services/employee.service';

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
  todoForm!: FormGroup;
  tasks: Task[] = [];
  inprogress: Task[] = [];
  done: Task[] = [];

  isEditEnabled: boolean = false;
  updatedTask: Task | any;
  currentUser: any;

  innerWidth: any;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.todoForm = this.fb.group({
      item: ['', Validators.required],
    });
    this.currentUser = StorageService.getUser();

    this.getTasksByuser_id(
      StorageService.getUser()?.id ? Number(StorageService.getUser()?.id) : 0
    );
  }

  getTasksByuser_id(id: number) {
    this.employeeService.getTasksByUserId(id).subscribe((res) => {
      console.log(res);

      this.tasks = res
        .filter((el: any) => el?.type === 'todo')
        .map((el: any) => ({
          ID: el.id,
          Title: el?.title,
          user_id: el?.user_id,
          Description: el?.description,
          id: el?.id ?? 0,
          Type: 'todo',
        }));
      this.inprogress = res
        .filter((el: any) => el?.type === 'inprogress')
        .map((el: any) => ({
          ID: el.id,
          Title: el?.title,
          user_id: el?.user_id,
          Description: el?.description,
          id: el?.id ?? 0,
          Type: 'inprogress',
        }));
      this.done = res
        .filter((el: any) => el?.type === 'done')
        .map((el: any) => ({
          ID: el.id,
          Title: el?.title,
          user_id: el?.user_id,
          Description: el?.description,
          id: el?.id ?? 0,
          Type: 'done',
        }));
    });
  }

  addTask() {
    const now = new Date();
    const isoString = now.toISOString();
    this.employeeService
      .addTask({
        title: this.todoForm.value.item,
        user_id: this.currentUser?.id ?? 0,
        type: 'todo',
        dueDate: isoString,
        description: this.todoForm.value.item,
      })
      .subscribe((res) => {
        console.log('testttttttt', res);

        this.tasks.push({
          Title: this.todoForm.value.item,
          Completed: false,
          user_id: this.currentUser?.id ?? 0,
          id: res?.id ?? 0,
          Type: 'todo',
        });

        this.todoForm.reset();
      });
  }

  updateTask() {
    this.employeeService
      .updateTask(
        {
          title: this.todoForm.value.item,
          user_id: this.currentUser?.id ?? 0,
          type: this.updatedTask?.Type,
          description: this.todoForm.value.item,
        },
        this.updatedTask?.id
      )
      .subscribe((res) => {
        console.log('testttttttt', res);

        if (this.updatedTask.Type === 'todo') {
          const index = this.tasks.findIndex(
            (task) => task.id === this.updatedTask.id
          );
          this.tasks[index].Title = this.todoForm.value.item;
          this.tasks[index].Completed = false;
        } else if (this.updatedTask.Type === 'inprogress') {
          const index = this.inprogress.findIndex(
            (task) => task.id === this.updatedTask.id
          );
          this.inprogress[index].Title = this.todoForm.value.item;
          this.inprogress[index].Completed = false;
        } else if (this.updatedTask.Type === 'done') {
          const index = this.done.findIndex(
            (task) => task.id === this.updatedTask.id
          );
          this.done[index].Title = this.todoForm.value.item;
          this.done[index].Completed = false;
        }
        this.todoForm.reset();
        // this.updatedTask = undefined;
        this.isEditEnabled = false;
      });
  }

  deleteTask(task: Task) {
    this.employeeService.deleteTask(task.id).subscribe((res) => {
      this.tasks = this.tasks.filter((el) => el.id !== task.id);
    });
  }
  deleteInprogressTask(task: Task) {
    this.employeeService.deleteTask(task.id).subscribe((res) => {
      this.inprogress = this.inprogress.filter((el) => el.id !== task.id);
    });
  }
  deleteDoneTask(task: Task) {
    this.employeeService.deleteTask(task.id).subscribe((res) => {
      this.done = this.done.filter((el) => el.id !== task.id);
    });
  }

  onEditTask(task: Task, TaskId: number) {
    this.todoForm.controls['item'].setValue(task.Title);
    this.updatedTask = task;
    this.isEditEnabled = true;
  }

  drop(event: CdkDragDrop<Task[]>) {
    console.log('testttttttt', event);

    if (event.previousContainer === event.container) {
      console.log('testttttttt--------------');
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      this.employeeService
        .updateTask(
          {
            title: event.item.data?.Title,
            user_id: event.item?.data.user_id,
            type:
              event.container.id === 'cdk-drop-list-0'
                ? 'todo'
                : event.container.id === 'cdk-drop-list-1'
                ? 'inprogress'
                : 'done',
            description: event.item.data?.Description,
          },
          event.item.data?.id
        )
        .subscribe((res) => {
          this.getTasksByuser_id(
            StorageService.getUser()?.id ? Number(StorageService.getUser()?.id) : 0
          );
          // transferArrayItem(
          //   event.previousContainer.data,
          //   event.container.data,
          //   event.previousIndex,
          //   event.currentIndex
          // );
        });
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
