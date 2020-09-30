import { Component, OnInit } from '@angular/core';
import { SummaryReview } from '../../../shared/interfaces/summary-review';
import { Summary } from '../../../shared/classes/summary';
import { DatabaseService } from '../../../core/services/database/database.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  summaryList: Summary[];
  summaryListMock = [{
    id: '1',
    date: 'December 17, 1995 03:24:00',
    review: [
      {
        productId: '1',
        productName: 'Banana',
        amount: 100,
        calories: 95,
        protein: 1.5,
        fat: 0.2,
        carbs: 21.8
      },
      {
        productId: '2',
        productName: 'Tomato',
        amount: 100,
        calories: 24,
        protein: 1.1,
        fat: 0.2,
        carbs: 3.8
      },
      {
        productId: '3',
        productName: 'Cucumber',
        amount: 100,
        calories: 14,
        protein: 0.8,
        fat: 0.1,
        carbs: 2.5
      },
    ]
  },
    {
    id: '2',
    date: 'December 22, 1995 03:24:00',
    review: [
      {
        productId: '1',
        productName: 'Banana',
        amount: 100,
        calories: 95,
        protein: 1.5,
        fat: 0.2,
        carbs: 21.8
      },
      {
        productId: '2',
        productName: 'Tomato',
        amount: 100,
        calories: 24,
        protein: 1.1,
        fat: 0.2,
        carbs: 3.8
      },
      {
        productId: '3',
        productName: 'Cucumber',
        amount: 100,
        calories: 14,
        protein: 0.8,
        fat: 0.1,
        carbs: 2.5
      },
    ]
  }];

  constructor(
    private dbService: DatabaseService
  ) { }

  ngOnInit(): void {
    this.summaryList = this.summaryListMock.map(result => new Summary(result));
    this.dbService.getCollection('users').valueChanges().subscribe(res => {
      console.log(res);
    });
  }

}
