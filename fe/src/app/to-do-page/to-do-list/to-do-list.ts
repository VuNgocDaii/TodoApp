import { Component, Input, OnChanges, OnInit ,Output, EventEmitter} from '@angular/core';
import { TaskService } from '../../service/task-service'
import { Task } from '../../model/task.model'
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Router} from '@angular/router'
@Component({
  selector: 'app-to-do-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.scss',
})
export class ToDoList implements OnInit, OnChanges {
  
  constructor(private taskService: TaskService, private router: Router) { }
  tasks: Task[] =[];
  curUrl: string = '';
  ngOnInit() {
     this.curUrl = this.router.url;
    if (this.curUrl==='/deletedTasksPage') this.tasks = this.taskService.load(true);
    else this.tasks = this.taskService.load(false);
  //  this.tasks=[{"taskId":1,"title":"Dọn dẹp phòng ngủ","description":"Gấp chăn ga, lau bụi bàn học và hút bụi sàn.","status":"Pending","priority":"Medium","createAt":"2025-01-03T08:00:00","updateAt":"2025-01-03T08:10:00","isDeleted":false},{"taskId":2,"title":"Nấu cơm trưa","description":"Chuẩn bị cơm, rau luộc và món mặn đơn giản.","status":"Done","priority":"High","createAt":"2025-01-03T10:30:00","updateAt":"2025-01-03T11:30:00","isDeleted":false},{"taskId":3,"title":"Tập thể dục 30 phút","description":"Chạy bộ nhẹ hoặc tập cardio tại nhà.","status":"Pending","priority":"High","createAt":"2025-01-03T07:00:00","updateAt":"2025-01-03T07:05:00","isDeleted":false},{"taskId":4,"title":"Giặt và phơi quần áo","description":"Cho đồ vào máy giặt, phơi lên giá cho khô.","status":"Done","priority":"Medium","createAt":"2025-01-02T09:15:00","updateAt":"2025-01-02T09:50:00","isDeleted":false},{"taskId":5,"title":"Đi chợ mua đồ ăn","description":"Mua rau, thịt, trứng và trái cây cho 2–3 ngày.","status":"Pending","priority":"High","createAt":"2025-01-03T15:00:00","updateAt":"2025-01-03T15:05:00","isDeleted":false},{"taskId":6,"title":"Dọn dẹp bếp","description":"Rửa chén, lau mặt bếp và đổ rác.","status":"Done","priority":"Low","createAt":"2025-01-02T20:00:00","updateAt":"2025-01-02T20:25:00","isDeleted":false},{"taskId":7,"title":"Chuẩn bị đồ cho ngày mai","description":"Sắp xếp balo, quần áo và kiểm tra lịch hẹn.","status":"Pending","priority":"Medium","createAt":"2025-01-03T21:00:00","updateAt":"2025-01-03T21:10:00","isDeleted":false}];localStorage.setItem('key_task',JSON.stringify(this.tasks));localStorage.setItem('key_id','8');
    
  }
  
  sort() {
    if (!this.sortOption) {
      return;
    }
    const priorityOrder: Record<string, number> = {
      'Low': 1,
      'Medium': 2,
      'High': 3
    };

    switch (this.sortOption) {
      case 'title-asc':
        this.tasks.sort((a, b) => a.title.localeCompare(b.title));
        break;

      case 'title-desc':
        this.tasks.sort((a, b) => b.title.localeCompare(a.title));
        break;

      case 'priority-asc':
        this.tasks.sort((a, b) => {
          const pa = priorityOrder[a.priority] ?? 0;
          const pb = priorityOrder[b.priority] ?? 0;
          return pa - pb;  
        });
        break;

      case 'priority-desc':
        this.tasks.sort((a, b) => {
          const pa = priorityOrder[a.priority] ?? 0;
          const pb = priorityOrder[b.priority] ?? 0;
          return pb - pa;
        });
        break;
      case 'none':{ this.tasks=this.taskService.searchAndFilter(this.curUrl,this.filter.searchStr, this.filter.statusFilter , this.filter.priorityFilter);
      console.log(this.filter.statusFilter + ' ' +this.filter.priorityFilter);}
        break;
    }
  }

  sortOption: string = '';
  @Input() filter!: { searchStr: string, statusFilter: string[], priorityFilter: string[] };
  @Output() taskChange = new EventEmitter<any>();
  @Input() callReload: number = 0;
  @Output() formTitleChange = new EventEmitter<any>();
  
  ngOnChanges() {
    if (this.curUrl==='/deletedTasksPage') this.tasks = this.taskService.load(true);
    else 
      this.tasks = this.taskService.load(false);
    console.log('change ...');
    this.tasks = this.taskService.searchAndFilter(this.curUrl,this.filter.searchStr ?? '', this.filter.statusFilter ?? [], this.filter.priorityFilter ?? []);
    // if (this.callReload > 0) console.log(this.callReload);
    if (this.callReload > 0) {
      if (this.curUrl==='/deletedTasksPage') this.tasks = this.taskService.load(true);
      else this.tasks = this.taskService.load(false);
      // this.tasks= this.taskService.load();
      this.callReload=0;
    }
   
  }
  curSortTitle: string = '';
  curSortPrio: string='';
  onChangeSortTitle(event: any, timeSort: number) {
    const select = event.target as HTMLSelectElement | null;
    const value = select?.value ?? '';
    if (timeSort===0){
    this.sortOption = value;
    this.curSortTitle = value;
    console.log(this.curSortPrio);
    this.sort();
    this.onChangeSortPrio(this.curSortPrio,(1));
    }
    else {
      this.sortOption = this.curSortTitle; 
      this.sort();
       this.onChangeSortPrio(this.curSortPrio,(1));
    }
    
  }
  onChangeSortPrio(event: any, timeSort: number) {
    const select = event.target as HTMLSelectElement | null;
    const value = select?.value ?? '';
    if (timeSort ===0){
    this.sortOption = value;
    this.curSortPrio = value;
    this.sort();
    this.onChangeSortTitle(this.curSortTitle,(1));
    }
    else {
      this.sortOption = this.curSortPrio; 
      this.sort();
      console.log('out lan 1'); 
    }
  }
  toggleStatus(task: any) {
    task.status = task.status === 'Done' ? 'Pending' : 'Done';
    if (task.status==='Done') this.taskService.markDone(task.taskId);
    if (task.status==='Pending') this.taskService.unmarkDone(task.taskId);
  }
  emitChoosenTask(value? :Task) {
    // console.log(value.taskId);
    this.taskChange.emit(value);
  }
  emitNewFormTitle(value?: string) {
    console.log(value);
    this.formTitleChange.emit(value);
  }
}
