<template>
  <div class="create-container">
    <h1>Write your next song</h1>
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
          <option v-for="genre in genres" :key="genre" :value="genre">Genre: {{ genre }}</option>
        </select>
      </div>
      <input
        type="text"
        id="negative-prompt"
        class="input negative"
        v-model="negativePrompt"
        v-bind:placeholder="defaultNegative"
      />
      <button class="create-button" @click="generateLyrics">Generate Lyrics</button>
    </div>
  </div>
  <div class="lyrics-container" v-for="lyric in generatedLyrics" :key="lyric">
    <h2>Your Song</h2>
    <p class="lyrics">{{ lyric }}</p>
    <button class="delete-button" @click="removeLyric(index)">Delete</button>
  </div>
</template>

<script>
import { generateLyrics } from '../scripts/openai'
import SettingsIcon from '../components/icons/SettingsIcon.vue'
import DownArrow from '../components/icons/DownArrow.vue'

export default {
  components: {
    SettingsIcon,
    DownArrow
  },
  data() {
    return {
      prompt: '',
      negativePrompt: '',
      defaultPrompt: 'A happy song about London',
      defaultNegative: 'add words to exclude',
      generatedLyric: {},
      generatedLyrics: [],
      loading: false,
      selectedGenre: 'Rock',
      genres: ['Rock', 'Pop', 'Hip-Hop', 'Jazz', 'Classical', 'Electronic', 'Other'],
      showSettings: false
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
    async generateLyrics() {
      try {
        const theme = this.prompt
        const genre = this.selectedGenre
        const newLyric = await generateLyrics(theme, genre)
        this.generatedLyrics.push(newLyric)
        localStorage.setItem('generatedLyrics', JSON.stringify(this.generatedLyrics))
      } catch (error) {
        console.error('Error generating lyrics:', error)
        this.generatedLyrics.push('Error generating lyrics.')
      }
    },
    loadFromLocalStorage() {
      const storedLyrics = localStorage.getItem('generatedLyrics')
      if (storedLyrics) {
        this.generatedLyrics = JSON.parse(storedLyrics)
      }
    },
    removeLyric(index) {
      this.generatedLyrics.splice(index, 1)
      localStorage.setItem('generatedLyrics', JSON.stringify(this.generatedLyrics))
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

.delete-button {
  background-color: red;
  display: flex;
  color: white;
  padding: 5px 10px;
  width: 100px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.delete-button:hover {
  background-color: darkred;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type='number'] {
  -moz-appearance: textfield;
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

.lyrics-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 50%;
  margin: 0 auto;
  margin-top: 50px;
  color: white;
}

.lyrics {
  margin-top: 10px;
  padding: 30px;
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
