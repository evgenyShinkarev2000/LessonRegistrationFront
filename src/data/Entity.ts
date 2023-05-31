export class Entity{
  public readonly id: number;

  public constructor(id: number){
    if (id % 1 !== 0){
      throw new Error(`id must be whole number, got ${id}`)
    }
    this.id = id;
  }
}