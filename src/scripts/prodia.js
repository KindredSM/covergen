const base = 'https://api.prodia.com/v1'

const headers = {
  'X-Prodia-Key': '433f6624-ec6c-41a8-841d-805381a319b7'
}

const createJob = async (params) => {
  const response = await fetch(`${base}/job`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  })

  if (response.status !== 200) {
    throw new Error(`Bad Prodia Response: ${response.status}`)
  }

  return response.json()
}

const getJob = async (jobId) => {
  const response = await fetch(`${base}/job/${jobId}`, {
    headers
  })

  if (response.status !== 200) {
    throw new Error(`Bad Prodia Response: ${response.status}`)
  }

  return response.json()
}

export { createJob, getJob }
