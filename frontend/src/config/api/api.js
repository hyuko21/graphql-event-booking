const BASE_URL = 'http://localhost:3000/graphql'

export default {
  async post(data) {
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
