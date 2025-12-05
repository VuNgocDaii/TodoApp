import { Component , Input, Output, EventEmitter} from '@angular/core';
import { Task } from '../../model/task.model';
import { DatePipe } from '@angular/common';
import { TaskService } from '../../service/task-service';
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
  @Input() formTitle : string = '';
  @Output() closeForm = new EventEmitter<void>();
  constructor(private taskService: TaskService) { }
  onCloseClick() {
    this.closeForm.emit();
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
}
