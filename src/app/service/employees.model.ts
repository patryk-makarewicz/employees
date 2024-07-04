export interface EmployeesModel {
  id: string;
  createdTime: string;
  fields: {
    name: string;
    surname: string;
    position: string;
    FTE: number;
    salary: number;
  };
}

export interface EmployeesDTO {
  records: EmployeesModel[];
}
