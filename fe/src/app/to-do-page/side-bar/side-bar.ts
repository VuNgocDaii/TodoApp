import { Component, Output, EventEmitter, ViewChild, ElementRef, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Router} from '@angular/router'
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.scss',
})
export class SideBar {
  @Output() filterChange = new EventEmitter<any>();
  @Input() triggerFilter:any;
  @ViewChild('statusGroup', { static: false }) statusGroup!: ElementRef<HTMLDivElement>;
  @ViewChild('priorityGroup', { static: false }) priorityGroup!: ElementRef<HTMLDivElement>;
  constructor(private router:Router) {}
  curUrl: string = '';
  ngOnInit(){
    this.curUrl = this.router.url;
    console.log(this.curUrl);
  }
  
  searchStr: string = '';
  statusFilter: string[] = [];
  priorityFilter: string[] = [];

  private emitFilter() {
    this.filterChange.emit({
      searchStr: this.searchStr,
      statusFilter: this.statusFilter,
      priorityFilter: this.priorityFilter
    });
  }
  
  onChangeSearchStr(value: string) {
    this.searchStr = value;
    this.emitFilter();
    this.triggerFilter = 0;
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
}
