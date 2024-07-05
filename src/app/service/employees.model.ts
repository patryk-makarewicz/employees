export interface EmployeesModel {
  id: string;
  createdTime: string;
  fields: {
    name: string;
    surname: string;
    position: string;
    fte: number;
    salary: number;
  };
}

export interface EmployeesDTO {
  records: EmployeesModel[];
}

export interface CreateEmployeeModel {
  records: {
    fields: {
      name: string;
      surname: string;
      position: string;
      fte: number;
      salary: number;
    };
  }[];
}

export interface RemoveEmployeeModel {
  id: string;
}
