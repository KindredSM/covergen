import axios from 'axios'
const base = 'http://localhost:3000'

export async function generateLyrics(theme, genre) {
  try {
    const response = await axios.post(`${base}/generate-lyrics`, { theme, genre })

    return response.data.result
  } catch (error) {
    console.error('Error generating lyrics:', error)
    throw error
  }
}
