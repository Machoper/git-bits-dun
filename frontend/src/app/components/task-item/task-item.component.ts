import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/dao/task';
import { TaskApiService } from 'src/app/api/task-api.service';
import { ToastService } from 'src/app/services/toast.service';
import { TaskService } from 'src/app/services/task.service';
import { PriorityOptions, IPriority } from 'src/app/dao/priority-options';
import * as _ from 'underscore';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {

  @Input() editMode: boolean;
  @Input() task: Task;
  @Output() taskDeleted: EventEmitter<any> = new EventEmitter();
  @Output() taskChecked: EventEmitter<any> = new EventEmitter();
  @Output() taskEdited: EventEmitter<any> = new EventEmitter();

  priorityOption: IPriority;

  constructor(
    private taskApiService: TaskApiService,
    private toastService: ToastService,
    private taskService: TaskService
  ) { }

  ngOnInit() {
    this.priorityOption = PriorityOptions.getOptionByValue(this.task.priority);
  }

  public onDelete(task: Task): void {
    this.taskApiService.deleteTask(task._id).subscribe((response) => {
      this.toastService.show(response.message);
      this.taskDeleted.emit({task});
    });
  }

  public onEdit(task: Task): void {
    const data = {
      _id: task._id,
      title: task.title,
      description: task.description,
      priority: task.priority
    };
    const dialogRef = this.taskService.openTaskModal(data);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskApiService.updateTask(result).subscribe(response => {
          const updatedTask = response.data;
          this.taskEdited.emit({ task: updatedTask });
          // this.priorityOption = PriorityOptions.getOptionByValue(updatedTask.priority);
          this.toastService.show(response.message);
        }, this.toastService.showError);
      }
    });
  }

  public onCheck(task: Task): void {
    this.taskApiService.updateTask(task).subscribe(response => {
      const updatedTask = response.data;
      this.taskChecked.emit({ task: updatedTask });
      const toast = updatedTask.completed ? `Completed '${updatedTask.title}'!` : `'${updatedTask.title}' has been added back to the list!`;
      this.toastService.show(toast);
    }, this.toastService.showError);
  }

}
