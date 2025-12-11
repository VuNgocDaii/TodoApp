import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../model/task.model';
import { CommonModule, DatePipe, NgIf } from '@angular/common';
import { TaskService } from '../../service/task-service';
import { ActivatedRoute, Router } from '@angular/router'
import { log } from 'console';
import { Category } from '../../model/category.model';
import { CategoryService } from '../../service/category-service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-to-do-up-del-form',
  imports: [DatePipe, CommonModule, FormsModule],
  templateUrl: './to-do-up-del-form.html',
  styleUrl: './to-do-up-del-form.scss',
})
export class ToDoUpDelForm {
  @Input() task: Task = {
    taskId: 0,
    title: '',
    description: '',
    status: '',
    createAt: new Date(),
    updateAt: new Date(),
    priority: '',
    isDeleted: false,
    categoryId: 0
  };
  @Input() checkReload: number = 0;
  curUrl: string = '';
  cats?: Category[];
  @Input() formTitle: string = '';
  @Output() closeForm = new EventEmitter<void>();
  @Output() triggerAllFilter = new EventEmitter<void>();
  constructor(private categoryService: CategoryService, private taskService: TaskService, private router: Router, private route: ActivatedRoute) { }
  categoryId: number = 0;
  ngOnInit() {
    this.cats = this.categoryService.load(false);
    this.curUrl = this.router.url;
    this.route.paramMap.subscribe(params => {
      this.categoryId = Number(params.get('categoryId'));
      // console.log(this.categoryId);
    });

    // console.log(this.task.title);
  }
  
  onCloseClick() {
    this.closeForm.emit();
  }
  onCloseClickReload() {
    console.log("F5");
    window.location.reload();

  }
  ngOnChanges() {
    if (this.checkReload > 0) {
      // this.task = this.taskService.loadTask(this.task.taskId,this.categoryId);
      this.checkReload = 0;
    }
    console.log('abc');
  }

  @Output() reloadList = new EventEmitter<void>();
  updateTask(titleInput: string, descInput: string, statusSelect: string, prioritySelect: string, newCatId: string) {
    this.onChangeTitle(titleInput);
    console.log(this.categoryId + ' ' + newCatId + ' upd')
    if (titleInput === '') {
      // this.isWarningmOpen=true;
      return;
    }
    titleInput = titleInput.trim();
    descInput = descInput.trim();

    const curTask: Task = {
      taskId: this.task.taskId,
      title: titleInput,
      description: descInput,
      status: statusSelect,
      priority: prioritySelect,
      createAt: this.task.createAt,
      updateAt: new Date(),
      isDeleted: this.task.isDeleted,
      categoryId: Number(newCatId)
    };

    console.log(titleInput);
    if (titleInput === '') {
      // this.isWarningmOpen=true;
      return;
    }
    console.log(curTask.title);
    this.taskService.update(curTask, this.categoryId);
    this.task = this.taskService.loadTask(this.task.taskId, Number(newCatId));
    this.openWarning('edit');
    this.reloadList.emit();
  }
  isWarningmOpen = false;
  deleteTask(curTask?: Task) {
    this.taskService.delete(curTask?.taskId, this.categoryId);
    // console.log(curTask?.isDeleted+"xoa");
    this.reloadList.emit();
  }
  addNewTask(newTitle: string, newDescription: string, newStatus: string, newPriority: string, newCatId: string) {

    this.onChangeTitle(newTitle);
    if (newTitle === '') {
      // this.openWarning('title-blank-notrim');

      return;
    }
    newTitle = newTitle.trim();
    // this.isWarningmOpen=true;
    newDescription = newDescription.trim();
    console.log(newTitle);
    if (newTitle === '') {
      // this.openWarning('title-blank-trim');

      return;
    }
    let curCatId = Number(newCatId);
    console.log(curCatId + ' ' + newCatId);
    this.taskService.add(newTitle, newDescription, newStatus, newPriority, curCatId);
    this.openWarning('add');
    this.triggerAllFilter.emit();

    this.reloadList.emit();
  }
  restoreTask(curTask?: Task) {
    this.taskService.restore(curTask?.taskId);
    this.reloadList.emit();
  }
  get categoryNameReadonly(): string {
    let cats = this.categoryService.loadFull();
    let cat = cats.find(c => c.categoryId === this.task.categoryId);
    return cat ? cat.categoryName : 'None';
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
  inputState: string = 'normal';
  onChangeTitle(input: string) {
    this.inputState = 'normal';
    if (input === '') this.inputState = 'empty';
    else {
      input = input.trim();
      if (input === '') this.inputState = 'only-space'
    }
    console.log(this.inputState);
  }
}
