export interface Summary {
  id: string;
  date: string;
  review: {
    productId: string;
    amount: number;
    calories: number;
    protein: number;
    fat: number;
    carb: number;
  }[];
}
