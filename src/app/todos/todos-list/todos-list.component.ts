import { Component, OnInit } from '@angular/core';
import { TodoService } from '../shared/todo.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.scss']
})
export class TodosListComponent implements OnInit {
  public todos: Observable<any[]>;

  loading = true;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todos = this.todoService.getTodosList().snapshotChanges();
    this.todos.subscribe(() => {
      this.loading = false;
    });
  }

  onDeleteTodos() {
    // this.todoService.deleteAll();
  }

}
