import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Task } from 'src/app/dao/task';
import { TaskApiService } from 'src/app/api/task-api.service';
import { ToastService } from 'src/app/services/toast.service';
import { TaskService } from 'src/app/services/task.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  loading: Subscription;
  todoList: Task[];
  completedList: Task[];
  editMode: boolean;
  showCompleted: boolean;

  constructor(
    private taskApiService: TaskApiService,
    private toastService: ToastService,
    private taskServcie: TaskService
  ) {
    this.todoList = [];
    this.completedList = [];
  }

  ngOnInit() {
    this.loading = this.taskApiService.getTasks().subscribe((response) => {
      const taskList = response.data;
      _.each(taskList, (task: Task) => {
        if (task.completed) {
          this.completedList.push(task);
        } else {
          this.todoList.push(task);
        }
      });
      this.todoList = _.sortBy(this.todoList, 'priority');
      this.completedList = _.sortBy(this.completedList, 'priority');
    });
  }

  public addTask() {
    const dialogRef = this.taskServcie.openTaskModal();
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskApiService.addTask(result).subscribe(response => {
          const task = response.data;
          this.taskServcie.addTaskToList(this.todoList, task);
          this.toastService.show(`Successfully added '${task.title}'!`);
        }, this.toastService.showError);
      }
    });
  }

  public onTaskDeleted($event): void {
    const task = $event.task;
    if (task.completed) {
      this.taskServcie.removeTaskFromList(this.completedList, task._id);
    } else {
      this.taskServcie.removeTaskFromList(this.todoList, task._id);
    }
  }

  public onTaskChecked($event): void {
    const task = $event.task;
    if (task.completed) {
      this.taskServcie.removeTaskFromList(this.todoList, task._id);
      this.taskServcie.addTaskToList(this.completedList, task);
    } else {
      this.taskServcie.removeTaskFromList(this.completedList, task._id);
      this.taskServcie.addTaskToList(this.todoList, task);
    }
  }

  public onTaskEdited($event): void {
    const updatedTask = $event.task;
    const taskId = updatedTask._id;
    const oldTask = _.findWhere(this.todoList, {_id: taskId});
    if (updatedTask.priority !== oldTask.priority) {
      this.taskServcie.removeTaskFromList(this.todoList, taskId);
      this.taskServcie.addTaskToList(this.todoList, updatedTask);
    } else {
      _.extend(oldTask, _.pick(updatedTask, ['title', 'description']));
    }
  }

  public toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  public toggleShowCompleted(): void {
    this.showCompleted = !this.showCompleted;
  }

  public gitBitsDun(): void {
    const randomIdx = Math.floor(Math.random() * this.todoList.length);
    const selectedTask = this.todoList[randomIdx];
    selectedTask.hasTimer = true;

    const elementId = `task_${selectedTask._id}`;
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({behavior: 'smooth', block: 'center'});
    }
  }

  public isGitBitsDunDisabled(): boolean {
    return _.some(this.todoList, task => task.hasTimer) || this.todoList.length < 5;
  }

}
