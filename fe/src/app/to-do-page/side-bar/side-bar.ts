import { Component, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.scss',
})
export class SideBar {
  @Output() filterChange = new EventEmitter<any>();
  @ViewChild('statusGroup', { static: false }) statusGroup!: ElementRef<HTMLDivElement>;
  @ViewChild('priorityGroup', { static: false }) priorityGroup!: ElementRef<HTMLDivElement>;

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
  }

  onChangeStatus(event: Event, value: string) {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      if (!this.statusFilter.includes(value)) this.statusFilter.push(value);
    } else {
      this.statusFilter = this.statusFilter.filter(s => s !== value);
    }

    this.emitFilter();
  }

  onChangePriority(event: Event, value: string) {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      if (!this.priorityFilter.includes(value)) this.priorityFilter.push(value);
    } else {
      this.priorityFilter = this.priorityFilter.filter(s => s !== value);
    }

    this.emitFilter();
  }

  toggleAllStatus(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;

    if (!this.statusGroup) return;

    const items = this.statusGroup
      .nativeElement
      .querySelectorAll<HTMLInputElement>('input.status-item');

    items.forEach(cb => {
      if (cb.checked !== checked) {
        cb.checked = checked;
        cb.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
  }

  toggleAllPriority(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;

    if (!this.priorityGroup) return;

    const items = this.priorityGroup
      .nativeElement
      .querySelectorAll<HTMLInputElement>('input.priority-item');

    items.forEach(cb => {
      if (cb.checked !== checked) {
        cb.checked = checked;
        cb.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
  }
}
