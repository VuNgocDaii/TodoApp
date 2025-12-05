import { Component , Input, Output, EventEmitter} from '@angular/core';
import { Task } from '../../model/task.model';
import { DatePipe, NgIf } from '@angular/common';
import { TaskService } from '../../service/task-service';
import { Router } from '@angular/router'
import { log } from 'console';
@Component({
  selector: 'app-to-do-up-del-form',
  imports: [DatePipe],
  templateUrl: './to-do-up-del-form.html',
  styleUrl: './to-do-up-del-form.scss',
})
export class ToDoUpDelForm {
  @Input() task : Task = {
    taskId :0,
    title:'',
    description:'',
    status:'',
    createAt:'',
    updateAt:'',
    priority:'',
    isDeleted:false
  };
  @Input() checkReload:number=0;
  curUrl: string = '';
  @Input() formTitle : string = '';
  @Output() closeForm = new EventEmitter<void>();
  constructor(private taskService: TaskService, private router:Router) { }
  ngOnInit(){
    this.curUrl = this.router.url;
  }
  onCloseClick() {
    this.closeForm.emit();
  }
  ngOnChanges(){
     if (this.checkReload>0) {
      this.task = this.taskService.loadTask(this.task.taskId);
       this.checkReload = 0;
     }
    console.log('abc');
  }
  
  @Output() reloadList = new EventEmitter<void>();
  updateTask(titleInput: string,descInput:string,statusSelect: string, prioritySelect:string) {
    const curTask: Task ={
      taskId: this.task.taskId,
      title: titleInput,
      description: descInput,
      status: statusSelect,
      priority: prioritySelect,
      createAt: this.task.createAt,
      updateAt: new Date().toISOString(),
      isDeleted: this.task.isDeleted
    } ;
    console.log(curTask.title);
    this.taskService.update(curTask);
    this.task = this.taskService.loadTask(this.task.taskId);
    this.reloadList.emit();
  }
  deleteTask(curTask?: Task) {
    this.taskService.delete(curTask?.taskId);
    // console.log(curTask?.isDeleted+"xoa");
    this.reloadList.emit();
  }
  addNewTask(newTitle: string,newDescription: string, newStatus: string, newPriority:string){
    this.taskService.add(newTitle, newDescription, newStatus,newPriority);
    this.reloadList.emit();
  }
  restoreTask(curTask? : Task){
    this.taskService.restore(curTask?.taskId);
    this.reloadList.emit();
  }
}
