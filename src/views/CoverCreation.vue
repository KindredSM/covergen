<template>
  <div class="create-container">
    <h1>Create your next cover art</h1>
    <div class="create">
      <input
        type="text"
        id="prompt"
        class="input"
        v-model="prompt"
        v-bind:placeholder="defaultPrompt"
      />

      <input
        type="text"
        id="negative-prompt"
        class="input negative"
        v-model="negativePrompt"
        v-bind:placeholder="defaultNegative"
      />
      <button class="create-button" @click="generateCover">create</button>
    </div>
  </div>
  <div class="created">
    <created-result
      v-for="result in generatedResults"
      :key="result.id"
      class="created-item"
      :result="result"
      :loading="result.loading"
      @delete="removeResult"
    />
  </div>
</template>

<script>
import CreatedResult from '../components/CreatedResult.vue'
import { createJob, getJob } from '../scripts/prodia'

export default {
  components: {
    CreatedResult
  },
  data() {
    return {
      prompt: '',
      negativePrompt: '',
      defaultPrompt: 'Man walking on water',
      defaultNegative: 'add words to exclude',
      generatedResult: {},
      generatedResults: [],
      loading: false
    }
  },
  methods: {
    async generateCover() {
      const newJob = {
        loading: true,
        status: 'pending'
      }

      this.generatedResults.push(newJob)

      try {
        const response = await createJob({
          model: 'sdv1_4.ckpt [7460a6fa]',
          prompt: this.prompt,
          negative_prompt: this.negativePrompt,
          seed: 100,
          steps: 30,
          cfg_scale: 7
        })

        console.log('Job Created! Waiting...')

        let job = response

        while (job.status !== 'succeeded' && job.status !== 'failed') {
          await new Promise((resolve) => setTimeout(resolve, 250))
          job = await getJob(job.job)
        }

        if (job.status !== 'succeeded') {
          throw new Error('Job failed!')
        }

        Object.assign(newJob, job)
        newJob.loading = false

        console.log('Generation completed!', job.imageUrl)

        this.updateLocalStorage()
      } catch (error) {
        console.error('Error generating cover:', error)
        newJob.status = 'failed'
        newJob.loading = false
      }
    },

    updateLocalStorage() {
      localStorage.setItem('generatedResults', JSON.stringify(this.generatedResults))
    },
    loadFromLocalStorage() {
      const storedResults = localStorage.getItem('generatedResults')
      if (storedResults) {
        this.generatedResults = JSON.parse(storedResults)
      }
    },
    removeResult(deletedResult) {
      this.generatedResults = this.generatedResults.filter((result) => result !== deletedResult)
      this.updateLocalStorage()
    }
  },
  created() {
    this.loadFromLocalStorage()
  }
}
</script>

<style>
* {
  font-size: 18px;
}
.create-container {
  margin-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

h2 {
  color: white;
}

img {
  border-radius: 20px;
}

.create {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 300px;
}

h1 {
  color: white;
  font-size: 24px;
  margin-bottom: 10px;
}
.input {
  border-radius: 30px;
  padding: 10px;
  border: none;
  outline: none;
  width: 100%;
  height: 50px;
  background: white;
}

.negative {
  background: none;
  color: white;
}

.create-button {
  border-radius: 30px;
  padding: 10px;
  width: 100%;
  height: 50px;
  background: none;
  border: 1px solid white;
  color: white;
  cursor: pointer;
  font-weight: bold;
  transition: ease-in-out 0.2s;
}

.create-button:hover {
  background: white;

  color: black;
}

.created {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  margin: 0 auto;
  gap: 20px;
  margin-top: 50px;
}

.created-item:hover {
  cursor: pointer;
}
</style>
