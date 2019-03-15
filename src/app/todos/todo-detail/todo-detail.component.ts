import { Component, OnInit, Input } from '@angular/core';
import { Todo } from '../shared/todo';
import { TodoService } from '../shared/todo.service';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss']
})
export class TodoDetailComponent {

  @Input() todo: Todo;
  @Input() key: string;

  constructor(private todoService: TodoService) { }

  onUpdateTimeStamp() {
    const date = new Date().getDate();
    this.todoService.updateTodo(this.key, { timeStamp: date });
  }

  onUpdateActive(value: boolean) {
    this.todoService.updateTodo(this.key, { active: value });
  }

  onDeleteTodo() {
    // console.log(this.key);
    this.todoService.deleteTodo(this.key);
  }

}
