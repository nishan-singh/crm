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
  yearlyEarnings: any;
  months: any[] = [];
  earnings: any[] = [];

  constructor() {}

  ngOnInit(): void {
    const yearlyEarningRef = collection(this.firestore, 'yearly-earnings');
    collectionData(yearlyEarningRef).subscribe((data: any) => {
      this.months = Object.keys(data[0]);
      this.earnings = Object.values(data[0]);
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
            data: [8, 13, 3, 5, 2, 3],
            backgroundColor: ['rgba(69, 69, 69, 0.2)'],
            borderColor: ['rgba(69, 69, 69, 1)'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
