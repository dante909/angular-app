export class Employee {
  public id: number
  public name: string

  public constructor (fields?: Partial<Employee>) {
    if (fields) {
        Object.assign(this, fields);
    }
} 
}