import { Entity } from "./Entity";
import { Semester } from "./Semester";
import { Student } from "./Student";

export class Subject extends Entity{
  public name: string;
  public description: string;
  public capacity: number;
  public registeredStudents?: Student[];
  public usedInSemesters?: Semester[];
}