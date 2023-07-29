import { Component, HostListener, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-yearly-earnings',
  templateUrl: './yearly-earnings.component.html',
  styleUrls: ['./yearly-earnings.component.scss'],
})
export class YearlyEarningsComponent {
  private firestore: Firestore = inject(Firestore);
  isFullScreen: boolean = false;
  rotateCanvas: boolean = false;
  yearlyEarnings: any;
  checkWidth: number = window.screen.width;
  months: any[] = [];
  earnings: any[] = [];
  expenses: any[] = [];

  constructor() {}

  ngOnInit(): void {
    const yearlyEarningRef = collection(this.firestore, 'yearly-earnings');
    collectionData(yearlyEarningRef).subscribe((data: any) => {
      this.months = data.map((d: any) => d.month);
      this.earnings = data.map((d: any) => d.earning);
      this.expenses = data.map((d: any) => d.expenses);
      this.displayYearlyEarning();
    });
  }

  @HostListener('document: keydown', ['$event'])
  onKeydownHandler(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      document.body.style.overflow = 'auto';
      this.isFullScreen = false;
    }
  }
  @HostListener('window: resize', ['$event'])
  onResize(event: any): void {
    this.checkWidth = event.target.innerWidth;
  }

  toggleFullScreen(): void {
    document.body.style.overflow = this.isFullScreen ? 'auto' : 'hidden';
    this.isFullScreen = !this.isFullScreen;
    this.checkIfMobile();
  }

  displayYearlyEarning(): void {
    Chart.register(...registerables);
    new Chart('yearlyEarningChart', {
      type: 'bar',
      data: {
        labels: this.months,
        datasets: [
          {
            label: 'Yearly Earning (in Euros)',
            data: this.earnings,
            backgroundColor: ['rgba(117, 194, 246,0.3)'],
            borderColor: ['rgba(117, 194, 246,1)'],
            borderWidth: 1,
          },
          {
            label: 'Yearly Expenses (in Euros)',
            data: this.expenses,
            backgroundColor: ['rgba(69, 69, 69, 0.2)'],
            borderColor: ['rgba(69, 69, 69, 1)'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        resizeDelay: 0,
        aspectRatio: 1,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        indexAxis: this.checkIfMobile() ? 'y' : 'x',
      },
    });
  }

  checkIfMobile(): boolean {
    console.log(this.checkWidth);

    return this.checkWidth < 768 || window.screen.width < 768;
  }
}
