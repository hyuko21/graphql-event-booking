import api from './api'

export default {
  users() {
    return api.request({
      query: `
        query {
          users {
            _id
            email
          }
        }
      `,
    })
  },
  createUser(data) {
    return api.request({
      query: `
        mutation {
          createUser(userInput: { email: "${data.email}", password: "${data.password}" }) {
            _id
            email
          }
        }
      `,
    })
  },
  login(data) {
    return api.request({
      query: `
        query {
          login(email: "${data.email}", password: "${data.password}") {
            userId
            token
            tokenExpiration
          }
        }
      `,
    })
  },
}
