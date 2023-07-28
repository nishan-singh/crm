import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Output() isSidebarOpen = new EventEmitter<boolean>();
  sidebarOpen: boolean = false;

  constructor() {}

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
    this.isSidebarOpen.emit(this.sidebarOpen);
  }
}
