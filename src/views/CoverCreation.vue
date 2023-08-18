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
      <transition name="slide-fade"
        ><div v-if="showSettings" class="settings-container">
          <p class="settings-text">steps: {{ steps }}</p>
          <input type="range" id="steps" v-model="steps" min="1" max="30" class="slider" />
          <p class="settings-text">cfg: {{ cfg_scale }}</p>
          <input type="range" id="cfg" v-model="cfg_scale" min="1" max="9" class="slider" />
          <p class="settings-text">seed:</p>
          <input type="number" id="seed" v-model="seed" class="seed-input" />
        </div>
      </transition>
      <div class="select-container">
        <down-arrow class="down-arrow" />
        <select name="genre" id="genre" class="model-select" v-model="selectedGenre">
          <option v-for="genre in genres" :key="genre" :value="genre">Style: {{ genre }}</option>
        </select>
      </div>
      <div class="select-container">
        <down-arrow class="down-arrow" />
        <select name="model" id="model" class="model-select" v-model="selectedModel">
          <option v-for="model in models" :key="model.id" :value="`${model.name} [${model.id}]`">
            Model: {{ model.name }}
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
      defaultPrompt: 'Man walking on water, 4k',
      defaultNegative: 'add words to exclude',
      seed: '',
      generatedResult: {},
      generatedResults: [],
      loading: false,
      selectedGenre: 'Rock',
      genres: ['Rock', 'Pop', 'Hip-Hop', 'Jazz', 'Classical', 'Electronic', 'Other'],
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
    getGenrePrompt(genre) {
      switch (genre) {
        case 'Rock':
          return 'Guitarist rocking on stage, 4k, high resolution'
        case 'Pop':
          return 'Pop singer with colorful background, 4k, high resolution'
        case 'Hip-Hop':
          return 'Rapper performing in a club, 4k, high resolution'
        case 'Jazz':
          return 'Saxophonist in a jazz bar, 4k, high resolution'
        case 'Classical':
          return 'Orchestra performing a symphony, 4k, high resolution'
        case 'Electronic':
          return 'DJ mixing at a rave party, 4k, high resolution'
        case 'Other':
          return ''
        default:
          return ''
      }
    },
    async generateCover() {
      const genrePrompt = this.getGenrePrompt(this.selectedGenre)
      const fullPrompt = `${genrePrompt} ${this.prompt}`

      const newJob = {
        loading: true,
        status: 'pending'
      }

      this.generatedResults.push(newJob)

      const seedValue = this.seed ? this.seed : Math.floor(Math.random() * 1000000)

      try {
        const response = await createJob({
          model: this.selectedModel,
          prompt: fullPrompt,
          negative_prompt: this.negativePrompt,
          seed: seedValue,
          steps: Number(this.steps),
          cfg_scale: Number(this.cfg_scale)
        })
        console.log({
          model: this.selectedModel,
          prompt: this.prompt,
          negative_prompt: this.negativePrompt,
          seed: seedValue,
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
  }
}
</script>

<style>
h1 {
  color: white;
  font-size: 24px;
  margin-bottom: 10px;
  text-align: center;
}
h2 {
  color: white;
}

img {
  border-radius: 20px;
}

.settings-text {
  margin: 0px 10px;
}
.create {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 300px;
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

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type='number'] {
  -moz-appearance: textfield;
  appearance: textfield;
}

.seed-input {
  padding: 10px;
  box-sizing: border-box;
  border-radius: 30px;
  border: none;
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

.slider {
  margin: 10px;
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

@media screen and (max-width: 670px) {
  .created {
    display: flex;
    flex-direction: column;
  }
}
</style>
