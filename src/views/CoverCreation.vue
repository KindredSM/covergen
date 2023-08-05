<template>
  <div class="create-container">
    <h1>Create your next cover art</h1>
    <div class="create">
      <div class="prompt-input">
        <input
          type="text"
          id="prompt"
          class="input"
          v-model="prompt"
          v-bind:placeholder="defaultPrompt"
        />
        <button class="settings-button" @click="showSettings = !showSettings">
          <settings-icon />
        </button>
      </div>
      <input type="range" id="steps" v-model="steps" min="1" max="30" v-if="showSettings" />
      <input type="range" id="cfg" v-model="cfg_scale" min="1" max="9" v-if="showSettings" />

      <div class="select-container">
        <down-arrow class="down-arrow" />
        <select name="model" id="model" class="model-select" v-model="selectedModel">
          <option v-for="model in models" :key="model.id" :value="`${model.name} [${model.id}]`">
            {{ model.name }}
          </option>
        </select>
      </div>
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
import SettingsIcon from '../components/icons/SettingsIcon.vue'
import DownArrow from '../components/icons/DownArrow.vue'

export default {
  components: {
    CreatedResult,
    SettingsIcon,
    DownArrow
  },
  data() {
    return {
      prompt: '',
      negativePrompt: '',
      defaultPrompt: 'Man walking on water',
      defaultNegative: 'add words to exclude',
      generatedResult: {},
      generatedResults: [],
      loading: false,
      showSettings: false,
      steps: 30,
      cfg_scale: 7,
      models: [
        {
          name: 'anythingV5_PrtRE.safetensors',
          id: '893e49b9'
        },
        {
          name: 'sdv1_4.ckpt',
          id: '7460a6fa'
        },
        {
          name: 'absolutereality_V16.safetensors',
          id: '37db0fc3'
        },
        {
          name: 'deliberate_v2.safetensors',
          id: '10ec4b29'
        }
      ],
      selectedModel: 'sdv1_4.ckpt [7460a6fa]'
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
          model: this.selectedModel,
          prompt: this.prompt,
          negative_prompt: this.negativePrompt,
          seed: 100,
          steps: Number(this.steps),
          cfg_scale: Number(this.cfg_scale)
        })
        console.log({
          model: this.selectedModel,
          prompt: this.prompt,
          negative_prompt: this.negativePrompt,
          seed: 100,
          steps: this.steps,
          cfg_scale: this.cfg_scale
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
        this.loadFromLocalStorage()
      } catch (error) {
        console.error('Error generating cover:', error)
        newJob.status = 'failed'
        newJob.loading = false
        console.log({
          model: this.selectedModel,
          prompt: this.prompt,
          negative_prompt: this.negativePrompt,
          seed: 100,
          steps: this.steps,
          cfg_scale: this.cfg_scale
        })
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
    console.log(this.steps)
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
  padding-right: 70px;
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

.model-select {
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 20px;
  width: 100%;
  height: 45px;
  border: none;
  outline: none;
  cursor: pointer;
  transition: ease 0.2s;
  padding: 10px;
  padding-right: 50px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
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

.prompt-input {
  position: relative;
}

.created {
  display: grid;
  justify-items: center;
  align-items: center;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  width: 90%;
  margin: 0 auto;
  margin-top: 50px;
}

.select-container {
  position: relative;
}

.down-arrow {
  position: absolute;
  background: white;
  cursor: pointer;

  right: 25.5px;
  top: 12px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  transition: ease 0.2s;
}
.settings-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--colour-main);
  border-radius: 20px;
  width: 50px;
  height: 35px;
  position: absolute;
  right: 10px;
  top: 8px;
  cursor: pointer;
  transition: ease 0.2s;
}

.settings-button:hover,
.down-arrow:hover {
  opacity: 0.8;
}
.created-item:hover {
  cursor: pointer;
}
</style>
