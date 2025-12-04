import { Component, Input, OnChanges, OnInit ,Output, EventEmitter} from '@angular/core';
import { TaskService } from '../../service/task-service'
import { Task } from '../../model/task.model'
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-to-do-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.scss',
})
export class ToDoList implements OnInit, OnChanges {
  tasks: Task[] = [];
  constructor(private taskService: TaskService) { }
  ngOnInit() {
    // this.tasks = [
    //   {
    //     taskId: 1,
    //     title: "Hoàn thiện báo cáo tuần",
    //     description: "Tổng hợp tiến độ và gửi cho quản lý.",
    //     status: "Pending",
    //     priority: "High",
    //     createAt: "2025-01-03T09:15:00",
    //     updateAt: "2025-01-03T10:00:00",
    //     isDeleted: false
    //   },
    //   {
    //     taskId: 2,
    //     title: "Dọn dẹp email",
    //     description: "Xóa thư rác và phân loại lại hộp thư đến.",
    //     status: "Done",
    //     priority: "Low",
    //     createAt: "2025-01-02T14:10:00",
    //     updateAt: "2025-01-02T15:25:00",
    //     isDeleted: false
    //   },
    //   {
    //     taskId: 3,
    //     title: "Họp sprint planning",
    //     description: "Chuẩn bị backlog và thảo luận với team.",
    //     status: "Pending",
    //     priority: "Medium",
    //     createAt: "2025-01-05T08:00:00",
    //     updateAt: "2025-01-05T08:15:00",
    //     isDeleted: false
    //   },
    //   {
    //     taskId: 4,
    //     title: "Xem lại tài liệu API",
    //     description: "Đọc tài liệu backend mới để cập nhật UI.",
    //     status: "Done",
    //     priority: "Medium",
    //     createAt: "2025-01-01T11:30:00",
    //     updateAt: "2025-01-01T12:00:00",
    //     isDeleted: false
    //   },
    //   {
    //     taskId: 5,
    //     title: "Fix bug giao diện",
    //     description: "Sửa lỗi hiển thị ở màn hình Task Detail.",
    //     status: "Pending",
    //     priority: "High",
    //     createAt: "2025-01-06T09:20:00",
    //     updateAt: "2025-01-06T10:45:00",
    //     isDeleted: false
    //   },
    //   {
    //     taskId: 6,
    //     title: "Meeting với khách hàng",
    //     description: "Trao đổi yêu cầu mới cho module Dashboard.",
    //     status: "Done",
    //     priority: "High",
    //     createAt: "2024-12-30T15:00:00",
    //     updateAt: "2024-12-30T16:00:00",
    //     isDeleted: false
    //   },
    //   {
    //     taskId: 7,
    //     title: "Refactor code",
    //     description: "Dọn lại component TaskList cho dễ bảo trì.",
    //     status: "Pending",
    //     priority: "Low",
    //     createAt: "2025-01-04T09:00:00",
    //     updateAt: "2025-01-04T09:30:00",
    //     isDeleted: false
    //   },
    //   {
    //     taskId: 8,
    //     title: "Bổ sung unit test",
    //     description: "Thêm test case cho Task service.",
    //     status: "Done",
    //     priority: "Medium",
    //     createAt: "2025-01-02T13:45:00",
    //     updateAt: "2025-01-02T14:00:00",
    //     isDeleted: false
    //   },
    //   {
    //     taskId: 9,
    //     title: "Tối ưu truy vấn DB",
    //     description: "Cải thiện tốc độ API get-all-task.",
    //     status: "Pending",
    //     priority: "High",
    //     createAt: "2025-01-07T08:50:00",
    //     updateAt: "2025-01-07T09:05:00",
    //     isDeleted: false
    //   },
    //   {
    //     taskId: 10,
    //     title: "Cập nhật tài liệu dự án",
    //     description: "Update kiến trúc mới vào Wiki.",
    //     status: "Done",
    //     priority: "Low",
    //     createAt: "2024-12-29T10:15:00",
    //     updateAt: "2024-12-29T11:00:00",
    //     isDeleted: false
    //   },
    //   {
    //     taskId: 11,
    //     title: "Test smoke sau deploy",
    //     description: "Kiểm tra chức năng chính sau build mới.",
    //     status: "Pending",
    //     priority: "Medium",
    //     createAt: "2025-01-07T13:00:00",
    //     updateAt: "2025-01-07T13:10:00",
    //     isDeleted: false
    //   },
    //   {
    //     taskId: 12,
    //     title: "Viết hướng dẫn sử dụng",
    //     description: "Soạn tài liệu cho người mới.",
    //     status: "Done",
    //     priority: "Medium",
    //     createAt: "2025-01-03T16:20:00",
    //     updateAt: "2025-01-03T17:00:00",
    //     isDeleted: false
    //   },
    //   {
    //     taskId: 13,
    //     title: "Tạo mock API",
    //     description: "Dùng JSON server mô phỏng backend.",
    //     status: "Pending",
    //     priority: "Low",
    //     createAt: "2025-01-05T10:30:00",
    //     updateAt: "2025-01-05T10:45:00",
    //     isDeleted: false
    //   },
    //   {
    //     taskId: 14,
    //     title: "Review pull request",
    //     description: "Xem xét thay đổi của đồng đội.",
    //     status: "Done",
    //     priority: "High",
    //     createAt: "2025-01-01T09:10:00",
    //     updateAt: "2025-01-01T09:40:00",
    //     isDeleted: false
    //   },
    //   {
    //     taskId: 15,
    //     title: "Thanh lý task cũ",
    //     description: "Đánh dấu xoá các task bị bỏ.",
    //     status: "Pending",
    //     priority: "Low",
    //     createAt: "2025-01-06T11:00:00",
    //     updateAt: "2025-01-06T11:20:00",
    //     isDeleted: true
    //   },
    //   {
    //     taskId: 16,
    //     title: "Cập nhật giao diện mobile",
    //     description: "Sửa layout responsive.",
    //     status: "Done",
    //     priority: "High",
    //     createAt: "2024-12-28T14:40:00",
    //     updateAt: "2024-12-28T15:05:00",
    //     isDeleted: false
    //   },
    //   {
    //     taskId: 17,
    //     title: "Tạo task mới cho sprint",
    //     description: "Chuẩn bị backlog sprint mới.",
    //     status: "Pending",
    //     priority: "Medium",
    //     createAt: "2025-01-07T09:30:00",
    //     updateAt: "2025-01-07T09:45:00",
    //     isDeleted: false
    //   },
    //   {
    //     taskId: 18,
    //     title: "Bổ sung icon UI",
    //     description: "Thêm icon mới theo design system.",
    //     status: "Done",
    //     priority: "Low",
    //     createAt: "2025-01-04T12:00:00",
    //     updateAt: "2025-01-04T12:10:00",
    //     isDeleted: false
    //   },
    //   {
    //     taskId: 19,
    //     title: "Viết API create-task",
    //     description: "Thêm endpoint POST task trong backend.",
    //     status: "Pending",
    //     priority: "High",
    //     createAt: "2025-01-08T08:00:00",
    //     updateAt: "2025-01-08T08:30:00",
    //     isDeleted: false
    //   },
    //   {
    //     taskId: 20,
    //     title: "Chuẩn bị slide demo",
    //     description: "Làm slide thuyết trình cho team.",
    //     status: "Done",
    //     priority: "Medium",
    //     createAt: "2025-01-02T09:20:00",
    //     updateAt: "2025-01-02T10:10:00",
    //     isDeleted: false
    //   }
    // ];
    // localStorage.setItem('key_task', JSON.stringify(this.tasks));
    // localStorage.setItem('key_id', String(20));
   
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
    }
  }

  sortOption: string = '';
  @Input() filter!: { searchStr: string, statusFilter: string[], priorityFilter: string[] };
  @Output() taskChange = new EventEmitter<any>();
  ngOnChanges() {
    console.log(this.filter.statusFilter?.[0]);
    this.tasks = this.taskService.searchAndFilter(this.filter.searchStr ?? '', this.filter.statusFilter ?? [], this.filter.priorityFilter ?? []);
  }
  onChangeSort(event: Event) {
    const select = event.target as HTMLSelectElement | null;
    const value = select?.value ?? '';
    this.sortOption = value;
    this.sort();
  }
  toggleStatus(task: any) {
    task.status = task.status === 'Done' ? 'Pending' : 'Done';
    if (task.status==='Done') this.taskService.markDone(task.taskId);
    if (task.status==='Pending') this.taskService.unmarkDone(task.taskId);
  }
  emitChoosenTask(value :Task) {
    // console.log(value.taskId);
    this.taskChange.emit(value);
  }
}
