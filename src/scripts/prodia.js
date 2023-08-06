const base = 'http://localhost:3000'

const createJob = async (params) => {
  const response = await fetch(`${base}/job`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  })

  if (response.status !== 200) {
    throw new Error(`Bad Response from Server: ${response.status}`)
  }

  return response.json()
}

const getJob = async (jobId) => {
  const response = await fetch(`${base}/job/${jobId}`)

  if (response.status !== 200) {
    throw new Error(`Bad Response from Server: ${response.status}`)
  }

  return response.json()
}

export { createJob, getJob }
