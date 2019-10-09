import api from './api'

export default {
  users() {
    return api.post({
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
    return api.post({
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
    return api.post({
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
