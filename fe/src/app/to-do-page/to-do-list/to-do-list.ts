import { Component, Input, OnChanges, OnInit, Output, EventEmitter } from '@angular/core';
import { TaskService } from '../../service/task-service'
import { Task } from '../../model/task.model'
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'
import { CategoryService } from '../../service/category-service';
import { Category } from '../../model/category.model';
@Component({
  selector: 'app-to-do-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.scss',
})
export class ToDoList implements OnInit, OnChanges {

  constructor(private categoryService: CategoryService, private taskService: TaskService, private router: Router, private route: ActivatedRoute) { }
  tasks: Task[] = [];
  curUrl: string = '';
  categoryId: number = 0;
  cat?: Category;
  ngOnInit() {
    this.curUrl = this.router.url;
    this.route.paramMap.subscribe(params => {
      this.categoryId = Number(params.get('categoryId'));
      // console.log(this.categoryId);
    })
    console.log("cat: " + this.categoryId);
    this.cat = this.categoryService.loadCat(this.categoryId);
    if (this.curUrl === '/') this.tasks = this.taskService.loadFullCatType(false);
    
    if (this.curUrl.includes('/deletedTasksPage')) this.tasks = this.taskService.load(true, this.categoryId);
    else {
      if (this.curUrl.includes('/taskList')) this.tasks = this.taskService.load(false, this.categoryId);
      
    }
    if (this.curUrl === '/deletedTasksPage/0') this.tasks = this.taskService.loadFullCatType(true);
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
          let pa = 0;
          if (a.priority) pa = priorityOrder[a.priority];
          let pb = 0;
          if (b.priority) pb = priorityOrder[b.priority];
          return pa - pb;
        });
        break;

      case 'priority-desc':
        this.tasks.sort((a, b) => {
          let pa = 0;
          if (a.priority) pa = priorityOrder[a.priority];
          let pb = 0;
          if (b.priority) pb = priorityOrder[b.priority];
          return pb - pa;
        });
        break;
      case 'none': {
        this.tasks = this.taskService.searchAndFilter(this.curUrl, this.filter.searchStr, this.filter.statusFilter, this.filter.priorityFilter, this.categoryId);
        console.log(this.filter.statusFilter + ' ' + this.filter.priorityFilter);
      }
        break;
    }
  }

  sortOption: string = '';
  @Input() filter!: { searchStr: string, statusFilter: string[], priorityFilter: string[] };
  @Output() taskChange = new EventEmitter<any>();
  @Input() callReload: number = 0;
  @Output() formTitleChange = new EventEmitter<any>();

  ngOnChanges() {
    if (this.openAddCat) console.log("vung oi mo cua ra");
    else console.log("vung oi mo cua ");
    this.route.paramMap.subscribe(params => {
      this.categoryId = Number(params.get('categoryId'));
      // console.log(this.categoryId);
    })
    
    if (!this.categoryId) this.categoryId = 0;
    if (this.curUrl.includes('/deletedTasksPage')) this.tasks = this.taskService.load(true, this.categoryId);
    else this.tasks = this.taskService.load(false, this.categoryId);
    if (this.curUrl === '/') this.tasks = this.taskService.loadFullCatType(false);
    if (this.curUrl === '/deletedTasksPage/0') this.tasks = this.taskService.loadFullCatType(true);

    console.log('change ...');
    this.tasks = this.taskService.searchAndFilter(this.curUrl, this.filter.searchStr, this.filter.statusFilter, this.filter.priorityFilter, this.categoryId);

    this.sortOption = this.curSortTitle;
    this.sort();
    this.sortOption = this.curSortPrio;
    this.sort();

    this.applyTimeFilter();
    for (let t of this.tasks) console.log(t.taskId + ' ' + t.title+' '+t.categoryId+' '+'delete'+' '+t.isDeleted);
    // if (this.callReload > 0) console.log(this.callReload);
    if (this.callReload > 0) {
      if (this.curUrl.includes('/deletedTasksPage')) this.tasks = this.taskService.load(true, this.categoryId);
      else this.tasks = this.taskService.load(false, this.categoryId);
      if (this.curUrl === '/deletedTasksPage/0') this.tasks = this.taskService.loadFullCatType(true);
      
      this.tasks = this.taskService.searchAndFilter(this.curUrl, this.filter.searchStr, this.filter.statusFilter, this.filter.priorityFilter, this.categoryId);
      this.sortOption = this.curSortTitle;
      this.sort();
      this.sortOption = this.curSortPrio;
      this.sort();
      this.applyTimeFilter();
      // this.tasks= this.taskService.load();
      this.callReload = 0;
    }

  }
  curSortTitle: string = '';
  curSortPrio: string = '';
  onChangeSortTitle(event: any, timeSort: number) {
    const select = event.target as HTMLSelectElement | null;
    const value = select?.value ?? '';
    this.curSortTitle = value;
    if (this.curSortTitle === 'none') {
      this.sortOption = this.curSortTitle;
      this.sort();
      console.log("none-title   " + this.curSortPrio);
      this.sortOption = this.curSortPrio
      this.sort();
      return;
    }
    else {
      // console.log(this.curSortTitle);
      console.log("title   " + this.curSortPrio);
      this.sortOption = value;
      this.sort();
      this.sortOption = this.curSortPrio; if (this.sortOption !== 'none') this.sort();

    }


  }
  onChangeSortPrio(event: any, timeSort: number) {
    const select = event.target as HTMLSelectElement | null;
    const value = select?.value ?? '';
    this.curSortPrio = value;
    if (this.curSortPrio === 'none') {
      this.sortOption = this.curSortPrio;
      this.sort();

      this.sortOption = this.curSortTitle;
      this.sort();
      return;
    }
    else {
      this.sortOption = this.curSortTitle; this.sort();
      // console.log(this.curSortPrio);
      this.sortOption = this.curSortPrio;
      this.sort();


    }
  }
  @Input() openAddCat: boolean = false;
  @Output() reloadForm = new EventEmitter<any>();
  toggleStatus(task: any) {
    task.status = task.status === 'Done' ? 'Pending' : 'Done';
    if (task.status === 'Done') this.taskService.markDone(task.taskId, task.categoryId);
    if (task.status === 'Pending') this.taskService.unmarkDone(task.taskId, task.categoryId);

    this.reloadForm.emit();
  }
  emitChoosenTask(value: Task) {
    console.log('fail' + value.title);
    this.taskChange.emit(value);
  }
  emitNewFormTitle(value?: string) {
    for (let task of this.tasks)
      console.log(task.taskId + ' ' + task.title+' '+task.isDeleted);
    console.log(value);
    this.formTitleChange.emit(value);
  }
  timeFilter: string = 'all';
  fromDate: string = '';
  toDate: string = '';
  onChangeTimeFilter(event: any) {
    this.timeFilter = event.target.value;
    if (this.timeFilter !== 'from-to') {
      this.fromDate = '';
      this.toDate = '';
      this.applyTimeFilter();
    }
  }
  onDateChange() {
    if (this.fromDate && this.toDate) {
      this.applyTimeFilter();
    }
  }
  applyTimeFilter() {
    this.tasks = this.taskService.load(
      this.curUrl.includes('/deletedTasksPage'),
      this.categoryId
    );
    this.sortOption = this.curSortTitle;
    this.sort();
    this.sortOption = this.curSortPrio;
    this.sort();
    this.tasks = this.taskService.searchAndFilter(this.curUrl, this.filter.searchStr, this.filter.statusFilter, this.filter.priorityFilter, this.categoryId);
    if (!this.tasks) return;

    let filtered = this.tasks;

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    switch (this.timeFilter) {

      case 'today': {
        filtered = filtered.filter(t => {
          const created = new Date(t.createAt);
          return created >= todayStart && created <= todayEnd;
        });
        break;
      }

      case 'last-week': {
        const start = new Date();
        start.setDate(start.getDate() - 7);
        start.setHours(0, 0, 0, 0);

        const end = todayEnd;

        filtered = filtered.filter(t => {
          const created = new Date(t.createAt);
          return created >= start && created <= end;
        });
        break;
      }

      case 'from-to': {
        if (this.fromDate && this.toDate) {
          const start = new Date(this.fromDate);
          start.setHours(0, 0, 0, 0);

          const end = new Date(this.toDate);
          end.setHours(23, 59, 59, 999);

          filtered = filtered.filter(t => {
            const created = new Date(t.createAt);
            return created >= start && created <= end;
          });
        }
        break;
      }

      default:
        this.tasks = filtered;
    }
    this.tasks = filtered;
  }

  showStatusDropdown = false;
  showPriorityDropdown = false;

  statusOptions = ['Pending', 'Done'];
  priorityOptions = ['High', 'Medium', 'Low'];

  statusAllChecked = false;
  priorityAllChecked = false;

  
  toggleStatusDropdown(e: Event) {
    e.stopPropagation();
    this.showStatusDropdown = !this.showStatusDropdown;
    this.showPriorityDropdown = false;
  }

  togglePriorityDropdown(e: Event) {
    e.stopPropagation();
    this.showPriorityDropdown = !this.showPriorityDropdown;
    this.showStatusDropdown = false;
  }

  onStatusChange(value: string, e: Event) {
    const checked = (e.target as HTMLInputElement).checked;

    if (value === 'All') {
      this.statusAllChecked = !this.statusAllChecked;

      if (this.statusAllChecked) {
        this.filter.statusFilter = [...this.statusOptions];
      } else {
        this.filter.statusFilter = [];
      }
    } else {
      if (checked) {
        if (!this.filter.statusFilter.includes(value)) {
          this.filter.statusFilter.push(value);
        }
      } else {
        this.filter.statusFilter = this.filter.statusFilter.filter(s => s !== value);
      }
    }
    if (this.filter.statusFilter.length === this.statusOptions.length) this.statusAllChecked = true;
    else this.statusAllChecked = false;
    this.applyFilterAndSort();
  }


  getStatusLabel() {
    if (this.filter.statusFilter.length === 0) return 'None';
    if (this.filter.statusFilter.length === 2) return 'All';
    return this.filter.statusFilter.join(', ');
  }

  onPriorityChange(value: string, e: Event) {
    const checked = (e.target as HTMLInputElement).checked;

    if (value === 'All') {
      this.priorityAllChecked = !this.priorityAllChecked;

      if (this.priorityAllChecked) {
        this.filter.priorityFilter = [...this.priorityOptions];
      } else {
        this.filter.priorityFilter = [];
      }
    } else {
      if (checked) {
        if (!this.filter.priorityFilter.includes(value)) {
          this.filter.priorityFilter.push(value);
        }
      } else {
        this.filter.priorityFilter = this.filter.priorityFilter.filter(p => p !== value);
      }
      this.priorityAllChecked = this.filter.priorityFilter.length === this.priorityOptions.length;
    }

    this.applyFilterAndSort();
  }


  getPriorityLabel() {
    if (this.filter.priorityFilter.length === 0) return 'None';
    if (this.filter.priorityFilter.length === 3) return 'All';
    return this.filter.priorityFilter.join(', ');
  }

  private applyFilterAndSort() {
    this.tasks = this.taskService.searchAndFilter(
      this.curUrl,
      this.filter.searchStr,
      this.filter.statusFilter,
      this.filter.priorityFilter,
      this.categoryId
    );

    this.sortOption = this.curSortTitle;
    this.sort();
    this.sortOption = this.curSortPrio;
    this.sort();

    this.applyTimeFilter();
  }
  
}
