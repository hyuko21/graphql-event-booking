import api from './api'

export default {
  bookings(authToken) {
    return api.request(
      {
        query: `
        query {
          bookings {
            _id
            event {
              _id
              title
              date
            }
            createdAt
          }
        }
      `,
      },
      authToken
    )
  },
  bookEvent(eventId, authToken) {
    return api.request(
      {
        query: `
        mutation {
          bookEvent(eventId: "${eventId}") {
            _id
            event {
              _id
              title
              date
            }
            createdAt
          }
        }
      `,
      },
      authToken
    )
  },
}
