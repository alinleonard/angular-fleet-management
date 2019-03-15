import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireObject, AngularFireDatabase } from '@angular/fire/database';
import { Todo } from './todo';
import { Observable } from 'rxjs';

@Injectable()
export class TodoService {

  private basePath = '/todos';
  todos: AngularFireList<Todo[]> = null;
  todo: AngularFireObject<Todo> = null;

  constructor(private db: AngularFireDatabase) { }

  getTodosList(): AngularFireList<Todo[]> {
    this.todos = this.db.list(this.basePath);
    return this.todos;
  }

  getTodo(key: string): AngularFireObject<Todo> {
    const itemPath = `${this.basePath}/${key}`;
    this.todo = this.db.object(itemPath);
    return this.todo;
  }

  createTodo(todo: Todo): void {
    const itemRef = this.db.list(this.basePath);
    itemRef.push(todo)
      .catch(err => this.handleError(err));
  }

  updateTodo(key: string, value: any): void {
    this.todos.update(key, value)
      .catch(err => this.handleError(err));
  }

  deleteTodo(key: string): void {
    this.todos.remove(key)
      .catch(err => this.handleError(err));
  }

  deleteAll(): void {
    this.todos.remove()
      .catch(error => this.handleError(error));
  }

  private handleError(error) {
    console.log(error);
  }
}
