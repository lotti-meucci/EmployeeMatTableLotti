export interface Employees {
  employees: Employee[]
}

export interface Employee {
  id: number;
  birthDate: string;
  firstName: string;
  lastName: string;
  gender: string;
  hireDate: string;
}
