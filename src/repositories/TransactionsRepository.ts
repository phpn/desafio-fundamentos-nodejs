import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {

  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    var income = 0;
    var outcome = 0;
    this.transactions.map(transaction => {
      if (transaction.type === 'income') {
        income += transaction.value;
      } else {
        outcome += transaction.value;
      }
    })
    var total = income - outcome;
    const balance = { income, outcome, total };
    return balance;
  }

  public findPositiveBalance(value: number): boolean {
    const balance = this.getBalance();

    if (value > balance.total) {
      return false;
    } else {
      return true;
    }
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type
    });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
