import { Department } from "./Department";
import { Entity } from "./Entity";

export class Institute extends Entity{
  public name: string;
  public departments?: Department[];
}