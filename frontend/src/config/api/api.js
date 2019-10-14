const BASE_URL = 'http://localhost:3000/graphql'

export default {
  async request(data) {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return response.json()
  },
}
