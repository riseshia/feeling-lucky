const initQuotations: Array<string> = [];

export class DataStore {
  quotations: Array<string>;
  queue: Array<string>;
  constructor() {
    this.quotations = initQuotations;
    this.queue = [];
  }

  update(quotations: Array<string>) {
    this.quotations = quotations;
    this.shuffle();
  }

  pick(): string {
    if (this.queue.length === 0) {
      this.shuffle();
    }
    return this.queue.pop()!;
  }

  private shuffle() {
    const quotationWithOrder: Array<[
      string,
      number,
    ]> = this.quotations.map(q => [q, Math.random()]);
    quotationWithOrder.sort(([_q1, a], [_q2, b]) => a - b);
    this.queue = quotationWithOrder.map(([q, _order]) => q);
  }

  private pickIdx() {
    const size = this.quotations.length;
    return Math.floor(Math.random() * Math.floor(size));
  }
}
