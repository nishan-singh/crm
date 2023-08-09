import { Component, inject, HostListener } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-monthly-income',
  templateUrl: './monthly-income.component.html',
  styleUrls: ['./monthly-income.component.scss'],
})
export class MonthlyIncomeComponent {
  private firestore: Firestore = inject(Firestore);
  isFullScreen: boolean = false;
  rotateCanvas: boolean = false;
  yearlyEarnings: any;
  checkWidth: number = window.screen.width;
  sortedData: any[] = [];
  months: any[] = [];
  earnings: any[] = [];
  expenses: any[] = [];

  constructor() {}

  ngOnInit(): void {
    const yearlyEarningRef = collection(this.firestore, 'monthly-income');
    collectionData(yearlyEarningRef).subscribe((data: any) => {
      this.sortedData = data.sort((a: any, b: any) => a.month - b.month);
      this.sortedData.sort((a, b) => {
        const monthOrder = [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ];
        return monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month);
      });
      this.months = this.sortedData.map((d: any) => d.month);
      this.earnings = this.sortedData.map((d: any) => d.earning);
      this.expenses = this.sortedData.map((d: any) => d.expenses);

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
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 20,
          },
        },
      },
    });
  }
}
