export class OrderItem {
  constructor(
    private orderId: string,
    private quantity: number,
    private unitPriceInCents: number,
    private id?: string,
  ) {}

  public getId() {
    return this.id;
  }

  public setId(id: string) {
    this.id = id;
  }

  public getOrderId() {
    return this.orderId;
  }

  public setOrderId(orderId: string) {
    this.orderId = orderId;
  }

  public getQuantity() {
    return this.quantity;
  }

  public setQuantity(quantity: number) {
    this.quantity = quantity;
  }

  public getUnitPriceInCents() {
    return this.unitPriceInCents;
  }

  public setUnitPriceInCents(unitPriceInCents: number) {
    this.unitPriceInCents = unitPriceInCents;
  }
}
