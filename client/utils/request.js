import queryString from 'query-string'

async function request (url, body = null, options = {}) {
  try {
    const res = await fetch(url, {
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      ...options,
      body: body ? JSON.stringify(body) : null,
    })
    const payload = await res.json()
    return {
      payload,
      success: res.status === 200,
    }
  } catch (err) {
    return { success: false }
  }
}

export default {
  post: (url, body) => request(url, body, { method: 'POST' }),
  get: (url, params) => request(`${url}${params ? '?' : ''}${queryString.stringify(params)}`),
}
