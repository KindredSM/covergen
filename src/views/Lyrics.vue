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
        ><div v-if="showSettings" class="settings-container"></div>
      </transition>
      <div class="select-container">
        <down-arrow class="down-arrow" />
        <select name="genre" id="genre" class="model-select" v-model="selectedGenre">
          <option v-for="genre in genres" :key="genre" :value="genre">Genre: {{ genre }}</option>
        </select>
      </div>
      <button class="create-button" @click="generateLyrics">Generate Lyrics</button>
    </div>
  </div>
  <div class="lyrics-container" v-for="(lyric, index) in generatedLyrics" :key="lyric.id">
    <div class="icons">
      <copy-icon class="icon" @click="copyToClipboard(lyric.text)" />
      <transition name="slide-fade">
        <div v-if="copied" class="tooltip">Copied</div>
      </transition>
      <edit-icon class="icon" @click="editLyric(index)" />
      <delete-icon class="icon" @click="removeLyric(index)" />
    </div>
    <h2>song {{ lyric.id }}</h2>
    <textarea v-if="isEditing[index]" v-model="lyric.text" type="text" class="editable-lyric" />
    <p class="lyrics" v-else>{{ lyric.text }}</p>
  </div>
</template>

<script>
import { generateLyrics } from '../scripts/openai'
import SettingsIcon from '../components/icons/SettingsIcon.vue'
import DownArrow from '../components/icons/DownArrow.vue'
import CopyIcon from '../components/icons/copyIcon.vue'
import EditIcon from '../components/icons/editIcon.vue'

import DeleteIcon from '../components/icons/DeleteIcon.vue'

export default {
  components: {
    SettingsIcon,
    DownArrow,
    CopyIcon,
    EditIcon,
    DeleteIcon
  },
  data() {
    return {
      prompt: '',
      counter: 1,
      negativePrompt: '',
      defaultPrompt: 'A happy song about London',
      defaultNegative: 'add words to exclude',
      generatedLyric: {},
      generatedLyrics: [],
      loading: false,
      selectedGenre: 'Rock',
      genres: ['Rock', 'Pop', 'Hip-Hop', 'Jazz', 'Classical', 'Electronic', 'Other'],
      showSettings: false,
      isEditing: [],
      copied: false
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
        this.generatedLyrics.push({ id: this.counter, text: newLyric })
        localStorage.setItem('generatedLyrics', JSON.stringify(this.generatedLyrics))
        this.counter++
      } catch (error) {
        console.error('Error generating lyrics:', error)
        this.generatedLyrics.push('Error generating lyrics.')
        this.counter++
      }
    },
    showCopiedTooltip() {
      this.copied = true
      setTimeout(() => {
        this.copied = false
      }, 2000)
    },
    copyToClipboard(lyricText) {
      navigator.clipboard
        .writeText(lyricText)
        .then(() => {
          this.showCopiedTooltip()
        })
        .catch((err) => {
          console.error('Could not copy text: ', err)
        })
    },
    editLyric(index) {
      this.isEditing = Object.assign([], this.isEditing, { [index]: !this.isEditing[index] })
      localStorage.setItem('generatedLyrics', JSON.stringify(this.generatedLyrics))
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

<style scoped>
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

.tooltip {
  position: absolute;
  background-color: #333;
  color: white;
  padding: 5px;
  border-radius: 3px;
  font-size: 12px;
  bottom: 30px;
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
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 50%;
  height: 300px;
  margin: 0 auto;
  margin-top: 50px;
  padding: 20px;
  border-radius: 5px;
  color: white;
  background-color: #232323;
}

.editable-lyric {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #232323;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  width: 50%;
  height: 100%;
  box-sizing: border-box;
  resize: none;
  overflow-y: auto;
  white-space: pre-wrap;
}

.editable-lyric:focus {
  outline: none;
  border: none;
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

.icons {
  position: absolute;
  right: 20px;
  top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.icon {
  cursor: pointer;
  transition: ease all 0.2s;
}

.icon:hover {
  opacity: 0.8;
}
.delete-button:hover {
  background-color: darkred;
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
