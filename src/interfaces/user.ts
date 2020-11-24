export interface IUserAuthDTO {
  uuid?: string;
  userId: string;
  password: string;
  name: string;
  school: string;
  studentNo: string;
}

export interface IUserLoginDTO {
  userId: string;
  password: string;
}
