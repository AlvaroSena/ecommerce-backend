export class ProductVariant {
  constructor(
    private title: string,
    private imagesUrls: string[],
    private slug: string,
    private priceInCents: number,
    private productId: string,
    private id?: string,
  ) {}

  public getId() {
    return this.id;
  }

  public setId(id: string) {
    this.id = id;
  }

  public getTitle() {
    return this.title;
  }

  public setTitle(title: string) {
    this.title = title;
  }

  public getImagesUrls() {
    return this.imagesUrls;
  }

  public setImagesUrls(imagesUrls: string[]) {
    this.imagesUrls = imagesUrls;
  }

  public getSlug() {
    return this.slug;
  }

  public setSlug(slug: string) {
    this.slug = slug;
  }

  public getPriceInCents() {
    return this.priceInCents;
  }

  public setPriceInCents(priceInCents: number) {
    this.priceInCents = priceInCents;
  }

  public getProductId() {
    return this.productId;
  }

  public setProductId(productId: string) {
    this.productId = productId;
  }
}
