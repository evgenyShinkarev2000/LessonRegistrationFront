import { Department } from "./Department"
import { Entity } from "./Entity"
import { Student } from "./Student";
import { Subject } from "./Subject";

export class Semester extends Entity{
  public semesterNumber: number;
  public department: Department;
  public subjects?: Subject[];
  public students?: Student[];
}