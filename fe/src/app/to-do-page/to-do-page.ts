import { Component ,signal} from '@angular/core';
import { ToDoList } from "./to-do-list/to-do-list";
import { RouterOutlet } from "../../../node_modules/@angular/router/types/_router_module-chunk";
import { SideBar } from "./side-bar/side-bar";

@Component({
  selector: 'app-to-do-page',
  imports: [ToDoList, SideBar],
  templateUrl: './to-do-page.html',
  styleUrl: './to-do-page.scss',
  
})
export class ToDoPage {
  curFilter = {searchStr:'',statusFilter:'',priorityFilter:''};
  onChangeFilter(value: any) {
    this.curFilter = value;
  }
}
