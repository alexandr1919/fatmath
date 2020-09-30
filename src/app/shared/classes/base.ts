export class BaseObject {
  constructor(data?: object) {
    data && Object.assign(this, data);
  }
}
