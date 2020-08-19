export class User {
  private _name!: string;
  private _avatarUrl!: string;
  private _id?: number;

  constructor(parameters: { name: string; avatarUrl: string; id?: number }) {
    this.name = parameters.name;
    this.avatarUrl = parameters.avatarUrl;
    this.id = parameters.id;
  }

  set name(inName: string) {
    if (inName.length < 3) {
      throw new Error(`User name must have at least 3 characters`);
    }
    this._name = inName;
  }

  get name() {
    return this._name;
  }

  set avatarUrl(inAvatarUrl: string) {
    if (!inAvatarUrl.startsWith('http')) {
      throw new Error(`User avatarUrl must start with http`);
    }
    this._avatarUrl = inAvatarUrl;
  }

  get avatarUrl() {
    return this._avatarUrl;
  }

  set id(inId: number | undefined) {
    this._id = inId;
  }

  get id() {
    return this._id;
  }
}
