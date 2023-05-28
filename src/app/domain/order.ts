export class Order {
  constructor(
    public crust: string,
    public flavor: string,
    public size: string,
    public tableNumber: number,
    public id?: number,
    public timeStamp?: string
  ) {}
}
