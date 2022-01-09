interface UserInfo {
  name: string
  address: string
}

export class User {
  private constructor(private name: string, private address: string) {}

  static create(info: UserInfo) {
    return new User(info.name, info.address)
  }

  getName() {
    return this.name
  }

  getAddress() {
    return this.address
  }
}
