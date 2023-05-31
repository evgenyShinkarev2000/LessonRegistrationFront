import { Entity } from "./Entity";
import { Institute } from "./Institute";
import { Semester } from "./Semester";

export class Department extends Entity{
  public name: string;
  public institute: Institute;
  public semesters?: Semester[];
}