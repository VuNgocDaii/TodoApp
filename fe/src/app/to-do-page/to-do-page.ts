import { Component ,signal} from '@angular/core';
import { ToDoList } from "./to-do-list/to-do-list";
import { RouterOutlet } from "../../../node_modules/@angular/router/types/_router_module-chunk";
import { SideBar } from "./side-bar/side-bar";
import { Task } from '../model/task.model';
import { ToDoUpDelForm } from "./to-do-up-del-form/to-do-up-del-form";
import { NgIf } from "../../../node_modules/@angular/common/types/_common_module-chunk";

@Component({
  selector: 'app-to-do-page',
  imports: [ToDoList, SideBar, ToDoUpDelForm],
  templateUrl: './to-do-page.html',
  styleUrl: './to-do-page.scss',
  
})
export class ToDoPage {
  curFilter = {searchStr:'',statusFilter:[],priorityFilter:[]};
  
  onChangeFilter(value: any) {
    this.curFilter = value;
    console.log(this.curFilter.searchStr);
  }

  curTask? : Task;
  onChangeTask(value: any) {
    this.curTask = value;
    console.log(this.curTask?.title);
  }

  onCloseForm(value: any) {
    this.curTask = value;
    this.curFormTitle='';
    console.log(this.curTask?.title);
  }
  checkChange: number = 0;
  onReloadList() {
    // console.log("????");
     this.checkChange+=1;
  }
  onReloadForm() {
     this.checkChange+=1;
    //  console.log(this.checkChange+'a');
  }
  curFormTitle: string = '';
  onChangeForm(value: any){
    this.curFormTitle = value;
  }
  triggerFilterChange: number = 0;
  onTriggerAllFilter(){
    this.triggerFilterChange +=1;
    console.log(this.triggerFilterChange);
  }
}
