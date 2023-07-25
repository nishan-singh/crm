import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-nav-sidebar',
  templateUrl: './nav-sidebar.component.html',
  styleUrls: ['./nav-sidebar.component.scss'],
})
export class NavSidebarComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  showFiller = false;

  constructor() {}

  closeSidebar() {
    this.showFiller = false;
    this.sidenav.close();
  }

  openSidebar() {
    this.showFiller = true;
    this.sidenav.open();
  }
}
