import { Component, OnInit } from '@angular/core';
import { Todo } from '../shared/todo';
import { TodoService } from '../shared/todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent {
  todo: Todo = new Todo();
  constructor(private todoService: TodoService) { }

  onCreateTodo() {
    this.todoService.createTodo(this.todo);
    this.todo = new Todo();
  }

}
