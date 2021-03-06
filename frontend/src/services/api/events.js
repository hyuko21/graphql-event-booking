import api from './api'

export default {
  events() {
    return api.request({
      query: `
        query {
          events {
            _id
            title
            price
            date
            description
            creator {
              _id
              email
            }
          }
        }
      `,
    })
  },
  createEvent(data, authToken) {
    return api.request(
      {
        query: `
        mutation {
          createEvent(eventInput: { title: "${data.title}", price: ${data.price}, date: "${data.date}", description: "${data.description}" }) {
            _id
            title
            price
            date
            description
            creator {
              _id
              email
            }
          }
        }
      `,
      },
      authToken
    )
  },
}
