export default class UserService {
  constructor(httpClient) {
    this.http = httpClient
  }

  async getTest() {
    const { version } = await this.http.get("/version")

    return version
  }
}
