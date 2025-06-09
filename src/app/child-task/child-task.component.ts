import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-child-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './child-task.component.html',
  styleUrls: ['./child-task.component.css']
})
export class ChildTaskComponent {
  @Input() task!: { name: string; priority: string; date: string; completed: boolean };
  @Input() isOverdue!: boolean;

  @Output() toggle = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  onToggle() {
    this.toggle.emit();
  }
  onDelete() {
    this.delete.emit();
  }
}
