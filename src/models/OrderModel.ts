import { orderStatusEnum } from "../database/schema";

export type OrderStatus = (typeof orderStatusEnum.enumValues)[number];

export class Order {
  constructor(
    private userId: string,
    private status: OrderStatus,
    private totalInCents: number,
    private shippingAddress: string,
    private id?: string,
  ) {}

  public getId() {
    return this.id;
  }

  public setId(id: string) {
    this.id = id;
  }

  public getStatus() {
    return this.status;
  }

  public setStatus(status: OrderStatus) {
    this.status = status;
  }

  public getUserId() {
    return this.userId;
  }

  public setUserId(userId: string) {
    this.userId = userId;
  }

  public getTotalInCents() {
    return this.totalInCents;
  }

  public setTotalInCents(totalInCents: number) {
    this.totalInCents = totalInCents;
  }

  public getShippingAddress() {
    return this.shippingAddress;
  }

  public setShippingAddress(shippingAddress: string) {
    this.shippingAddress = shippingAddress;
  }
}
