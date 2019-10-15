const BASE_URL = 'http://localhost:3000/graphql'

export default {
  async request(data, token) {
    const headers = {
      'Content-Type': 'application/json',
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const response = await fetch(BASE_URL, {
      method: 'POST',
      body: JSON.stringify(data),
      headers,
    })

    return response.json()
  },
}
