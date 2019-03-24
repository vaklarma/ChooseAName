export class FirstnameModel {
  id: string;
  firstname?: string;
  description: string;


  constructor(data?: FirstnameModel) {
    if (data != null) {
      Object.assign(this, data);
    }

  }
}
