import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { TaskService} from '../../service/task-service'
import {Task} from '../../model/task.model'
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-to-do-list',
  imports: [CommonModule],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.scss',
})
export class ToDoList implements OnInit, OnChanges {
  tasks : Task[] = [];
  constructor(private taskService: TaskService){}
  ngOnInit() {
    this.tasks = this.taskService.load();
    // const taskList = this.taskService.searchAndFilter("","Pending","");
    //   let task : Task;
    //   for (task of taskList) {
    //     console.log(task.taskId + ' '+ task.title+' '+ task.description+ ' '+ task.status+ ' '+ task.priority+' '+task.createAt+' '+task.createAt);
    //   }
  }
  @Input() filter!:{searchStr:string, statusFilter:string, priorityFilter:string};
  ngOnChanges(){
    console.log(this.filter.searchStr);
    this.tasks=this.taskService.searchAndFilter(this.filter.searchStr,this.filter.statusFilter,this.filter.priorityFilter);
  }
}
