class UserInfo {
  constructor() {
    this.storage = localStorage;
  }

  get() {
    let jsonData = this.storage.getItem('user');
    let user =
      !jsonData || jsonData === 'undefined' ? null : JSON.parse(jsonData);

    if (!user || typeof user !== 'object') {
      return null;
    }

    return user;
  }

  set(user) {
    if (user && typeof user === 'object') {
      this.storage.setItem('user', JSON.stringify(user));
    }
  }

  remove() {
    this.storage.removeItem('user');
  }
}

export default new UserInfo();
