export interface Expense {
  id: string;
  groupId: string;
  description: string;
  amount: number;
  paidBy: string;
  splitType: 'even' | 'custom';
  participants: string[];
  customSplits?: {
    userId: string;
    amount: number;
  }[];
  createdAt: string;
}
