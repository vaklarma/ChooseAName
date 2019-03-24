export class UserModel {
  id: string;
  name: string;
  email: string;
  profilePictureUrl: string;
  selectedFirstNames?: { [key: string]: string };


  constructor(param?: UserModel) {
    if (param) {
      Object.assign(this, param);
    }
  }


}
