import { Component, Output, EventEmitter, ViewChild, ElementRef, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router'
import { Category } from '../../model/category.model';
import { CategoryService } from '../../service/category-service';
import { CommonModule, NgIf } from '@angular/common';
import { Task } from '../../model/task.model';
import { TaskService } from '../../service/task-service';
@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.scss',
})
export class SideBar {
  cats?: Category[];
  @Output() filterChange = new EventEmitter<any>();
  @Input() triggerFilter:any;
  @ViewChild('statusGroup', { static: false }) statusGroup!: ElementRef<HTMLDivElement>;
  @ViewChild('priorityGroup', { static: false }) priorityGroup!: ElementRef<HTMLDivElement>;
  constructor(private taskService:TaskService,private categoryService:CategoryService,private router:Router,private  route: ActivatedRoute) {}
  curUrl: string = '';
  categoryId: number = 0;
  ngOnInit(){
    this.curUrl = this.router.url;
    console.log(this.curUrl);
    this.route.paramMap.subscribe(params => {
      this.categoryId = Number(params.get('categoryId'));
      // console.log("Category ID nhận được:", this.categoryId);
    });
    if (this.curUrl.includes('/taskList') || this.curUrl==='/') this.cats = this.categoryService.load(false);
    else this.cats = this.categoryService.loadFull();
  }
  openResCat: boolean = false;
  searchStr: string = '';
  statusFilter: string[] = [];
  priorityFilter: string[] = [];
  curResTaskGroup = new Category(-1,'');
  onOpenResCat(title: String, c: Category){
    this.curResTaskGroup = c;
    this.openResCat = true;
  }

  onCancelResClick() {
    this.openResCat = false;
  }

  onCloseClickResReload(cat?:Category) {
    this.categoryService.restore(cat?.categoryId); 
    let taskList = this.taskService.loadFullCat();
    for (let t of taskList) 
      if (t.categoryId === cat?.categoryId) {
         this.taskService.restore(t.taskId);
        console.log(t.title);
      }
    this.openAddCat = false;
    console.log("F5 "+this.curTaskGroup?.isDeleted);
    this.goBack();
      if (this.curUrl=='/') window.location.reload();

  }
  private emitFilter() {
    this.filterChange.emit({
      searchStr: this.searchStr,
      statusFilter: this.statusFilter,
      priorityFilter: this.priorityFilter
    });
  }
  
  onChangeSearchStr(value: string) {
    console.log('searchcate ' + value);
    value= value.trim();
    console.log(this.curUrl);
      this.route.paramMap.subscribe(params => {
        this.categoryId = Number(params.get('categoryId'));
        // console.log("Category ID nhận được:", this.categoryId);
      });
      if (this.curUrl.includes('/taskList') || this.curUrl==='/') this.cats = this.categoryService.load(false);
      else this.cats = this.categoryService.loadFull();
    this.cats=this.categoryService.searchAndFilter(this.cats,value);

    if (value === '') {
    this.curUrl = this.router.url;
      console.log(this.curUrl);
      this.route.paramMap.subscribe(params => {
        this.categoryId = Number(params.get('categoryId'));
        // console.log("Category ID nhận được:", this.categoryId);
      });
      if (this.curUrl.includes('/taskList') || this.curUrl==='/') this.cats = this.categoryService.load(false);
      else this.cats = this.categoryService.loadFull();
    }
    // this.emitFilter();
    // this.triggerFilter = 0;
  }

  onChangeStatus(event: Event, value: string) {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      if (!this.statusFilter.includes(value)) this.statusFilter.push(value);
    } else {
      this.statusFilter = this.statusFilter.filter(s => s !== value);
    }
    this.triggerFilter = 0;
    this.emitFilter();
  }

  onChangePriority(event: Event, value: string) {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      if (!this.priorityFilter.includes(value)) this.priorityFilter.push(value);
    } else {
      this.priorityFilter = this.priorityFilter.filter(s => s !== value);
    }
    this.triggerFilter = 0;
    this.emitFilter();
  }

  toggleAllStatus(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    if (!this.statusGroup) return;
    const items = this.statusGroup.nativeElement.querySelectorAll<HTMLInputElement>('input.status-item');
    items.forEach(c => {
      if (c.checked !== checked) {
        c.checked = checked;
        c.dispatchEvent(new Event('change', { bubbles: true}));
      }
    });
    this.triggerFilter = 0;
  }

  toggleAllPriority(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    if (!this.priorityGroup) return;
    const items = this.priorityGroup.nativeElement.querySelectorAll<HTMLInputElement>('input.priority-item');
    items.forEach(c => {
      if (c.checked !== checked) {
        c.checked = checked;
        c.dispatchEvent(new Event('change', { bubbles: true}));
      }
    });
    this.triggerFilter = 0;
  }

  toggleAllOfPrio() {
    let count: number=0;
    const items = this.priorityGroup.nativeElement.querySelectorAll<HTMLInputElement>('input.priority-item');
    const allPrio = this.priorityGroup.nativeElement.querySelectorAll<HTMLInputElement>('input.priority-all-item');
    items.forEach(c => {
      if (c.checked === true) {
        count++;
      }
    });
    // console.log(count);
    allPrio.forEach(c => {
      if (c.value === 'All') {
        if (count === 3) c.checked = true;
        else c.checked = false;
      }
    });
    this.triggerFilter = 0;
  }

  toggleAllOfStatus() {
    let count: number=0;
    const items = this.statusGroup.nativeElement.querySelectorAll<HTMLInputElement>('input.status-item');
    const allStatusBtn = this.statusGroup.nativeElement.querySelectorAll<HTMLInputElement>('input.status-all-item');
    items.forEach(c => {
      if (c.checked === true) {
        count++;
      }
    });
    console.log(count);
    allStatusBtn.forEach(c => {
      if (c.value === 'All') {
        if (count === 2) c.checked = true;
        else c.checked = false;
      }
    });
    this.triggerFilter = 0;
  }
  goToTaskListPage(categoryId: number){
    
    if (this.curUrl.includes('/taskList') || this.curUrl==='/') {
      if (categoryId!==0) this.router.navigate(['/taskList',categoryId]);
      else this.router.navigate(['/']);
    }
    else this.goToDeletedTasksPage(categoryId);
    this.reloadList.emit();
    console.log("???");
  }
  @Output() reloadList = new EventEmitter<void>();
  goToDeletedTasksPage(categoryId: number){
    this.router.navigate(['/deletedTasksPage',categoryId]);
    this.reloadList.emit();
    console.log("???");
  }
  goBack(){
    this.router.navigate(['/']);
    this.reloadList.emit();

  }
  openedMenuId: number | null = null;

toggleMenu(categoryId: number, event: MouseEvent) {
  event.stopPropagation();
  this.openedMenuId = this.openedMenuId === categoryId ? null : categoryId;
}
  curContentForm = '';
  curTaskGroup? = new Category(-1,"");
  onDeleteCategory(c: Category) {
    this.openDelCat=true;
    this.curTaskGroup = c;
    console.log('delete gr ' + this.openDelCat+' '+c.categoryName);
  }
  openAddCat:boolean = false;
  updateTaskGroup(cat:Category,input:string) {
    cat.categoryName = input;
    this.categoryService.update(cat);
  }
  onOpenAddCat(formTitle: string,cat?: Category) {
    console.log('CatForm');
    this.curContentForm = formTitle;
    this.openAddCat = true;
    
    if (cat?.categoryId !== undefined) this.curTaskGroup = cat;
    // console.log(this.curTaskGroup?.categoryId+' '+this.curTaskGroup?.categoryName);
  }
  onCancelClick() {
    this.openAddCat = false;
    this.curTaskGroup = new Category(-1,"");
  }
  onCloseClickReload(input: string) {
    console.log(this.inputState+' '+this.openAddCat);
    if(!input) input='';
    console.log(input);
    this.changeInputState(input);
    console.log(this.inputState+' '+this.openAddCat);

    if (this.inputState !== 'ok') {return;}
    console.log(this.inputState);
    if (this.curContentForm === 'Add New Task Group') this.categoryService.add(input);
    else if (this.curTaskGroup) this.updateTaskGroup(this.curTaskGroup,input);
    this.openAddCat = false;
    console.log("F5");
    window.location.reload();

  }

  inputState: string='';
  changeInputState(input: string){
    if (input==='') {this.inputState = 'empty';return}
    input = input.trim();
    if (input==='') {this.inputState = 'only-space';return}
    this.inputState='ok';
  }
  openDelCat:boolean = false;
  onCancelDelClick() {
    this.openDelCat = false;
  }
  onCloseClickDelReload(cat?:Category) {
     this.categoryService.delete(cat?.categoryId); 
    let taskList = this.taskService.loadFullCat();
    for (let t of taskList) 
      if (t.categoryId === cat?.categoryId) {
         this.taskService.delete(t.taskId);
        console.log(t.title);
      }
    this.openAddCat = false;
    console.log("F5 "+this.curTaskGroup?.isDeleted);
    this.goBack();
      if (this.curUrl=='/') window.location.reload();

  }
}
