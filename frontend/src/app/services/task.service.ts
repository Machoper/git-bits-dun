import { Injectable } from '@angular/core';
import { Task } from 'src/app/dao/task';
import { TaskModalComponent } from 'src/app/components/task-modal/task-modal.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as _ from 'underscore';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private dialog: MatDialog) { }

  public removeTaskFromList(taskList: Task[], taskId: string): void {
    const index = _.findIndex(taskList, (task) => task._id === taskId);
    if (index !== -1) {
      taskList.splice(index, 1);
    }
  }

  public addTaskToList(taskList: Task[], task: Task): void {
    const index = _.sortedIndex(taskList, task, 'priority');
    taskList.splice(index, 0, task);
  }

  public openTaskModal(data?: any): MatDialogRef<TaskModalComponent> {
    return this.dialog.open(TaskModalComponent, {
      width: '800px',
      data: data || {}
    });
  }

}
