import { Component } from '@angular/core';
import { TaskService } from '../../app/service/task-service';
import {Task} from '../../app/model/task.model'
@Component({
  selector: 'app-test-component',
  imports: [],
  templateUrl: './test-component.html',
  styleUrl: './test-component.scss',
})
export class TestComponent {
    constructor(private taskService: TaskService) {}
    ngOnInit() {
      // this.taskService.add("abc","abc1",'Done','High','2025-10-05T14:48:00.000Z','2011-10-05T14:48:00.000Z');
      // this.taskService.add("bcd","abc1",'Done','High','2025-10-05T14:48:00.000Z','2011-10-05T14:48:00.000Z');
      // this.taskService.add("edf","abc1",'Done','High','2025-10-05T14:48:00.000Z','2011-10-05T14:48:00.000Z');
      // const taskList = this.taskService.searchAndFilter("","Done","High");
      // let task : Task;
      // for (task of taskList) {
      //   console.log(task.taskId + ' '+ task.title+' '+ task.description+ ' '+ task.status+ ' '+ task.priority+' '+task.createAt+' '+task.createAt);
      // }
      // console.log(this.taskService.genNewId());
    }
}
