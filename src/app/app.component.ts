import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import {ChildTaskComponent} from './child-task/child-task.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterOutlet, ChildTaskComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  taskName = '';
  priority = '';
  date = '';

  tasks: { name: string; priority: string; date: string; completed: boolean }[] = [];
  filter = 'all';

  addTask() {
    if (this.taskName && this.priority && this.date) {
      this.tasks.push({
        name: this.taskName,
        priority: this.priority,
        date: this.date,
        completed: false
      });
      this.taskName = '';
      this.priority = '';
      this.date = '';
    } else {
      alert('Please fill in all fields');
    }
  }

  deleteTask(task: any) {
    const index = this.tasks.indexOf(task);
    this.tasks.splice(index, 1);
  }

  toggleStatus(task: any) {
    task.completed = !task.completed;
  }

  isOverdue(task: any): boolean {
    const taskDate = new Date(task.date);
    const today = new Date();
    return !task.completed && taskDate < today;
  }

  clearAllTasks() {
    if (confirm('Are you sure you want to clear all tasks?')) {
      this.tasks = [];
    }
  }

  get filteredTasks() {
    if (this.filter === 'completed') return this.tasks.filter(t => t.completed);
    if (this.filter === 'pending') return this.tasks.filter(t => !t.completed);
    return this.tasks;
  }

  get completedCount() {
    return this.tasks.filter(t => t.completed).length;
  }

  get pendingCount() {
    return this.tasks.filter(t => !t.completed).length;
  }

  get overdueCount() {
    return this.tasks.filter(t => this.isOverdue(t)).length;
  }
}
