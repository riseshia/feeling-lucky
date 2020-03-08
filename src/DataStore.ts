export class DataStore {
  quotations: Array<string>;
  constructor() {
    this.quotations = [];
  }

  update(quotations: Array<string>) {
    this.quotations = quotations;
  }

  pick(): string {
    return this.quotations[this.pickIdx()];
  }

  private pickIdx() {
    const size = this.quotations.length;
    return Math.floor(Math.random() * Math.floor(size));
  }
}
