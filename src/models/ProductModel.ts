export class Product {
  private id?: string;

  constructor(private title: string, private description: string, private slug: string, private userId: string) {}

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

  public getDescription() {
    return this.description;
  }

  public setDescription(description: string) {
    this.description = description;
  }

  public getSlug() {
    return this.slug;
  }

  public setSlug(slug: string) {
    this.slug = slug;
  }

  public getUserId() {
    return this.userId;
  }

  public setUserId(userId: string) {
    this.userId = userId;
  }
}
