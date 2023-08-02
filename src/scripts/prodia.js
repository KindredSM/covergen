const base = 'https://api.prodia.com/v1'

const headers = {
  'X-Prodia-Key': 'insert-key-here'
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

let job = await createJob({
  model: 'sdv1_4.ckpt [7460a6fa]',
  prompt: 'puppies in a cloud, 4k',
  negative_prompt: '',
  seed: 100,
  steps: 30,
  cfg_scale: 7
})

console.log('Job Created! Waiting...')

while (job.status !== 'succeeded' && job.status !== 'failed') {
  await new Promise((resolve) => setTimeout(resolve, 250))

  job = await getJob(job.job)
}

if (job.status !== 'succeeded') {
  throw new Error('Job failed!')
}

console.log('Generation completed!', job.imageUrl)

export { createJob, getJob }
