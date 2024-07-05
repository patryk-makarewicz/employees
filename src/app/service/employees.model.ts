export interface Fields {
  name: string;
  surname: string;
  position: string;
  fte: number;
  salary: number;
}

export interface EmployeesModel {
  id: string;
  createdTime: string;
  fields: Fields;
}

export interface EmployeesDTO {
  records: EmployeesModel[];
}

export interface CreateEmployeeModel {
  records: {
    fields: Fields;
  }[];
}

export interface EditEmployeeModel {
  records: {
    id: string;
    fields: Fields;
  }[];
}
