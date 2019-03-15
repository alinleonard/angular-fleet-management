import { Component, OnInit } from '@angular/core';
import { AngularFireList, } from '@angular/fire/database';
import { Todo } from '../shared/todo';
import { TodoService } from '../shared/todo.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.scss']
})
export class TodosListComponent implements OnInit {
  public todos: Observable<any[]>;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todos = this.todoService.getTodosList().snapshotChanges();
  }

  onDeleteTodos() {
    // this.todoService.deleteAll();
  }

}
