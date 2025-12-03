import { Component ,Output, EventEmitter} from '@angular/core';
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
  searchStr: string = '';
  statusFilter: string[] = [];
  priorityFilter: string[] = [];

  private emitFilter(){
    this.filterChange.emit({
      searchStr: this.searchStr,
      statusFilter: this.statusFilter,
      priorityFilter: this.priorityFilter
    });
  }

  onChangeSearchStr(value: string){
    this.searchStr = value;
    this.emitFilter();
  }

  onChangeStatus(event: Event, value: string){
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      if (!this.statusFilter.includes(value)) this.statusFilter.push(value);
    } 
    else this.statusFilter = this.statusFilter.filter(s=>s !== value);
    
    this.emitFilter();
  }

  onChangePriority(event: Event, value: string){
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      if (!this.priorityFilter.includes(value)) this.priorityFilter.push(value);
    } 
    else this.priorityFilter = this.priorityFilter.filter(s=>s !== value);

    this.emitFilter();
  }
}
