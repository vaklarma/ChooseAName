export class UserModel {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePictureUrl?: string;
  gender: string;
  selectedFirstNames?: { [key: string]: string };


  constructor(param?: UserModel) {
    if (param) {
      Object.assign(this, param);
    }
  }


}
