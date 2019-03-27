export class UserModel {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePictureUrl?: string;
  gender: string;
  visitedFirstNames?: { [key: string]: boolean };


  constructor(param?: UserModel) {
    if (param) {
      Object.assign(this, param);
    }
  }


}
