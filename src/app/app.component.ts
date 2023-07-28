import { Component, HostListener, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('drawer') drawer: any;

  ngAfterViewInit(): void {
    if (window.innerWidth > 1024) {
      this.drawer.open();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    if (event.target.innerWidth < 1024 || window.innerWidth < 1024) {
      this.drawer.close();
    } else {
      this.drawer.open();
    }
  }

  toggleDrawer(): void {
    this.drawer.toggle();
  }
}
