import { Component , Input, Output, EventEmitter} from '@angular/core';
import { Task } from '../../model/task.model';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-to-do-up-del-form',
  imports: [DatePipe],
  templateUrl: './to-do-up-del-form.html',
  styleUrl: './to-do-up-del-form.scss',
})
export class ToDoUpDelForm {
  @Input() task? : Task;
  @Output() closeForm = new EventEmitter<void>();

  onCloseClick() {
    this.closeForm.emit();
  }
}
