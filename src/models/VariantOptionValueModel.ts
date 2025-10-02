export class VariantOptionValue {
  constructor(
    private value: string,
    private isSoldOut: boolean,
    private variantOptionId: string,
    private id?: string,
  ) {}

  public getId() {
    return this.id;
  }

  public setId(id: string) {
    this.id = id;
  }

  public getValue() {
    return this.value;
  }

  public setValue(value: string) {
    this.value = value;
  }

  public getIsSoldOut() {
    return this.isSoldOut;
  }

  public setIsSoldOut(isSoldOut: boolean) {
    this.isSoldOut = isSoldOut;
  }


  public getVariantOptionId() {
    return this.variantOptionId;
  }

  public setVariantOptionId(variantOptionId: string) {
    this.variantOptionId = variantOptionId;
  }
}
