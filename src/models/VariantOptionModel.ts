export class VariantOption {
  constructor(
    private name: string,
    private productVariantId: string,
    private id?: string,
  ) {}

  public getId() {
    return this.id;
  }

  public setId(id: string) {
    this.id = id;
  }

  public getName() {
    return this.name;
  }

  public setName(name: string) {
    this.name = name;
  }


  public getProductVariantId() {
    return this.productVariantId;
  }

  public setProductVariantId(productVariantId: string) {
    this.productVariantId = productVariantId;
  }
}
