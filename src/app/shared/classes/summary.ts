import { SummaryReview } from '../interfaces/summary-review';
import { BaseObject } from './base';

export class Summary extends BaseObject {
  id: string;
  date: string;
  review: SummaryReview[];

  getTotal(item) {
    let total = 0;
    this.review.forEach(reviewItem => {
      total += reviewItem[item];
    });
    return total;
  }
}
