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
          }
        }
      `,
    })
  },
  createEvent(data) {
    return api.request({
      query: `
        mutation {
          createEvent(eventInput: { title: "${data.title}", price: ${data.price}, date: "${data.date}", description: "${data.description}" }) {
            _id
            title
            price
            date
            description
          }
        }
      `,
    })
  },
}
