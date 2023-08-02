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
      <button class="create-button" @click="generateCover">create</button>
    </div>
  </div>
  <div class="created">
    <created-result class="created-item" :result="generatedResult" />
    <p>{{ generatedResult }}</p>
  </div>
</template>

<script>
import CreatedResult from '../components/CreatedResult.vue'
import axios from 'axios'

export default {
  components: {
    CreatedResult
  },
  data() {
    return {
      prompt: '',
      defaultPrompt: 'Man walking on water',
      generatedResult: ''
    }
  },
  methods: {
    generateCover() {
      const prodia = new Prodia(`433f6624-ec6c-41a8-841d-805381a319b7`)
      const options = {
        method: 'POST',
        url: 'https://api.prodia.com/v1/job',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          'X-Prodia-Key': '433f6624-ec6c-41a8-841d-805381a319b7'
        },
        data: {
          model: 'elldreths-vivid-mix.safetensors [342d9d26]',
          prompt: this.prompt,
          negative_prompt: 'badly drawn',
          steps: 25,
          cfg_scale: 7,
          seed: -1,
          upscale: false,
          sampler: 'Euler',
          aspect_ratio: 'square'
        }
      }

      axios
        .request(options)
        .then((response) => {
          this.generatedResult = response.data
          console.log(this.prompt)
        })
        .catch((error) => {
          console.log('failed')
          console.error(error)
        })
    }
  }
}
</script>

<style>
* {
  font-size: 16px;
}
.create-container {
  margin-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.create {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 300px;
}

h1 {
  color: white;
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
  column-gap: 20px;
}

.created-item {
  margin-top: 20px;
}
</style>
