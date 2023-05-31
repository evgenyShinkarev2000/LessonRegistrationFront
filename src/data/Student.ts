import { Entity } from "./Entity";
import { Semester } from "./Semester";

export class Student extends Entity{
  public name: string;
  public surname: string;
  public patronymic: string;
  public averageGrade: string;
  public semester: Semester;
}