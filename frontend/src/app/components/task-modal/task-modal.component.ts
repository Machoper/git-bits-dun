import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Task } from 'src/app/dao/task';
import { PriorityOptions, IPriority } from 'src/app/dao/priority-options';

const EDIT_TASK = 'Edit To-Do Task';
const CREATE_NEW_TASK = 'Create New To-Do Task';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss']
})
export class TaskModalComponent implements OnInit {

  taskForm: FormGroup;
  modelTitle: string;
  priorityOptions: IPriority[];

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<TaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Task
  ) { }

  ngOnInit() {
    this.taskForm = this.formBuilder.group({
      _id: this.data._id,
      title: this.data.title || '',
      description: this.data.description || '',
      priority: this.data.priority || 4
    });
    this.modelTitle = this.data._id ? EDIT_TASK : CREATE_NEW_TASK;
    this.priorityOptions = PriorityOptions.getOptions();
  }

  public cancel(): void {
    this.dialogRef.close();
  }

}
