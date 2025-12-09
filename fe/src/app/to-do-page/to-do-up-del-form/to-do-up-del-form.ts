import { Component , Input, Output, EventEmitter} from '@angular/core';
import { Task } from '../../model/task.model';
import { CommonModule, DatePipe, NgIf } from '@angular/common';
import { TaskService } from '../../service/task-service';
import { Router } from '@angular/router'
import { log } from 'console';
@Component({
  selector: 'app-to-do-up-del-form',
  imports: [DatePipe, CommonModule],
  templateUrl: './to-do-up-del-form.html',
  styleUrl: './to-do-up-del-form.scss',
})
export class ToDoUpDelForm {
  @Input() task : Task = {
    taskId :0,
    title:'',
    description:'',
    status:'',
    createAt:new Date(),
    updateAt:new Date(),
    priority:'',
    isDeleted:false
  };
  @Input() checkReload:number=0;
  curUrl: string = '';
  @Input() formTitle : string = '';
  @Output() closeForm = new EventEmitter<void>();
  @Output() triggerAllFilter = new EventEmitter<void>();
  constructor(private taskService: TaskService, private router:Router) { }
  ngOnInit(){
    this.curUrl = this.router.url;
  }
  onCloseClick() {
    this.closeForm.emit();
  }
  onCloseClickReload() {
    console.log("F5");
    window.location.reload(); 

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
    titleInput = titleInput.trim();
    descInput = descInput.trim();
    const curTask: Task ={
      taskId: this.task.taskId,
      title: titleInput,
      description: descInput,
      status: statusSelect,
      priority: prioritySelect,
      createAt: this.task.createAt,
      updateAt: new Date(),
      isDeleted: this.task.isDeleted
    } ;
    
    console.log(titleInput);
    if (titleInput === '') {
      this.isWarningmOpen=true;
      return;
    }
    console.log(curTask.title);
    this.taskService.update(curTask);
    this.task = this.taskService.loadTask(this.task.taskId);
    this.openWarning('edit');
    this.reloadList.emit();
  }
  isWarningmOpen = false;
  deleteTask(curTask?: Task) {
    this.taskService.delete(curTask?.taskId);
    // console.log(curTask?.isDeleted+"xoa");
    this.reloadList.emit();
  }
  addNewTask( newTitle: string,newDescription: string, newStatus: string, newPriority:string){
    if (newTitle === '') {
      this.openWarning('title-blank-notrim');
    
      return;
    }
    newTitle = newTitle.trim();
    this.isWarningmOpen=true;
    newDescription = newDescription.trim();
    console.log(newTitle);
    if (newTitle === '') {
      this.openWarning('title-blank-trim');
    
      return;
    } 
    this.taskService.add(newTitle, newDescription, newStatus,newPriority);
    this.openWarning('add');
    this.triggerAllFilter.emit();
   
    this.reloadList.emit();
  }
  restoreTask(curTask? : Task){
    this.taskService.restore(curTask?.taskId);
    this.reloadList.emit();
  }

  isConfirmOpen = false;
  confirmMode: string = '';
  warningMode: string = '';
  openConfirm(mode: string) {
    this.confirmMode = mode;
    this.isConfirmOpen = true;
    console.log(mode);
  }

  confirmDelete() {
    this.deleteTask(this.task);
    this.isConfirmOpen = false;
    this.openWarning('delete');
    // this.onCloseClick();
  }

  confirmRestore() {
    this.restoreTask(this.task);
    this.isConfirmOpen = false;
    this.openWarning('restore');
  }

  openWarning(mode: string) {
    console.log(mode);
    this.isWarningmOpen = true;
    this.warningMode = mode;
  }
}
