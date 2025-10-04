export class OrderItemDetails {
  constructor(
    private orderItemId: string,
    private productVariantId: string,
    private variantOptionId: string,
    private variantOptionValueId: string,
    private id?: string,
  ) {}

  public getId() {
    return this.id;
  }

  public setId(id: string) {
    this.id = id;
  }

  public getOrderItemId() {
    return this.orderItemId;
  }

  public setOrderItemId(orderItemId: string) {
    this.orderItemId = orderItemId;
  }

  public getProductVariantId() {
    return this.productVariantId;
  }

  public setProductVariantId(productVariantId: string) {
    this.productVariantId = productVariantId;
  }

  public getVariantOptionId() {
    return this.variantOptionId;
  }

  public setVariantOptionId(variantOptionId: string) {
    this.variantOptionId = variantOptionId;
  }

  public getVariantOptionValueId() {
    return this.variantOptionValueId;
  }

  public setVariantOptionValueId(variantOptionValueId: string) {
    this.variantOptionValueId = variantOptionValueId;
  }
}
