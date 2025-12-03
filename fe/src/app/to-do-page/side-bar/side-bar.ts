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
  statusFilter: string = '';
  priorityFilter: string = '';

  private emitFilter(){
    this.filterChange.emit({
      searchStr: this.searchStr,
      statusFiler: this.statusFilter,
      priorityFilter: this.priorityFilter
    });
  }

  onChangeSearchStr(value: string){
    this.searchStr = value;
    this.emitFilter();
  }
}
